using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.Translate;
using Amazon.Translate.Model;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.GitHub.Responses;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Contracts.Shared;
using GithubSyncer.Helpers.Shared;
using GithubSyncer.Services.Shared;
using GitHubSyncer.Contracts;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GitHubSyncer.Services
{
    public class GitHubService : IGitHubService
    {
        public readonly IAmazonS3 _s3;
        private readonly IS3Helper _s3Helper;
        private readonly AppSettings _appSettings;
        private readonly AppEnvironment _appEnvironment;
        public readonly IExternalRoutes _externalRoutes;
        public readonly GraphQLHttpClient _githubGraphQLClient;
        public readonly IAmazonTranslate _awsTranslate;

        public const string GitHubFolderS3Path = "GitHub";
        public const string PinnedRepositoriesFileName = "pinned_repositories";
        public readonly string[] TargetLanguagesCodeTranslations = new string[]
        {
            "PT"
        };
        public readonly List<string> InvariableNames = new List<string>();

        public GitHubService(
            IOptions<AppSettings> appSettings
            , AppEnvironment appEnvironment
            , IExternalRoutes externalRoutes
            , IS3Helper s3Helper
            , IAmazonS3 s3
            , IAmazonTranslate awsTranslate
        )
        {
            _s3 = s3;
            _appSettings = appSettings.Value;
            _appEnvironment = appEnvironment;
            _externalRoutes = externalRoutes;

            _githubGraphQLClient = GetGraphQLHttpClient(_appEnvironment.GitHubAccessToken, _externalRoutes.GitHubApiGraphQL);

            _s3Helper = s3Helper;
            _awsTranslate = awsTranslate;
        }

        private GraphQLHttpClient GetGraphQLHttpClient(string gitHubAccessToken, string gitHubApiGraphQL)
        {
            var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", gitHubAccessToken);

            var graphQLOptions = new GraphQLHttpClientOptions
            {
                EndPoint = new Uri(gitHubApiGraphQL)
            };

            return new GraphQLHttpClient(graphQLOptions, new NewtonsoftJsonSerializer(), httpClient);
        }

        private async Task<GetPinnedRepositoriesResponse> GetPinnedRepositories(string login)
        {
            var operationName = "GetPinnedRepositories";

            var getPinnedRepositoriesReq = new GraphQLRequest
            {
                Query = @"
                    query GetPinnedRepositories($login: String!) {
                        user(login: $login) {
                            pinnedItems(first: 5, types: REPOSITORY) {
                                edges {
                                    node {
                                        ... on Repository {
                                            name
                                            description
                                            languages(first: 2, orderBy: { field: SIZE, direction: DESC }) {
                                                nodes {
                                                    name
                                                    color
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ",
                OperationName = operationName,
                Variables = new
                {
                    login = login
                }
            };

            var res = await _githubGraphQLClient.SendQueryAsync<GetPinnedRepositoriesResponse>(getPinnedRepositoriesReq);

            return res.Data;
        }

        public async Task<PinnedRepositoriesFile> GetAndSyncPinnedRepositoriesFile()
        {
            var filePath = $"{GitHubFolderS3Path}/{PinnedRepositoriesFileName}";

            var getS3FileResponse = await _s3.GetObjectAsync(_appSettings.Buckets.Husky, filePath);
            var jsonPinnedRepositoriesFileFromS3 = await _s3Helper.GetFileContent(getS3FileResponse);

            var pinnedRepositoriesFileFromS3 = JsonConvert.DeserializeObject<PinnedRepositoriesFile>(jsonPinnedRepositoriesFileFromS3);

            var totalMinutesAfterModified = (DateTime.UtcNow - getS3FileResponse.LastModified).TotalMinutes;

            if (totalMinutesAfterModified > 30)
            {
                var pinnedRepositoriesFileFromGitHub = (await GetPinnedRepositories(_appSettings.GitHub.Login)).ToS3FileFormat();

                PutFileTranslationsToS3Thread(pinnedRepositoriesFileFromGitHub);

                return pinnedRepositoriesFileFromGitHub;
            }

            return pinnedRepositoriesFileFromS3;
        }

        private void PutFileTranslationsToS3Thread(PinnedRepositoriesFile pinnedRepositoriesFileFromGitHub)
        {
            new Thread(
                new ThreadStart(
                    async () => await PutFileTranslationsToS3(pinnedRepositoriesFileFromGitHub)
                )
            ).Start();
        }

        private async Task PutFileTranslationsToS3(PinnedRepositoriesFile repositories)
        {
            var filePath = $"{GitHubFolderS3Path}/{PinnedRepositoriesFileName}";

            await _s3Helper.PutObjToS3AsJson(repositories, filePath);

            var invariableNames = new HashSet<string>(InvariableNames).Union(repositories.Data.Select(repo => repo.Name));

            Parallel.ForEach(TargetLanguagesCodeTranslations, async targetLanguageCode =>
            {
                var dict = await TranslatePropertiesRecursively(
                    repositories,
                    targetLanguageCode,
                    invariableNames
                );

                await _s3Helper.PutObjToS3AsJson(dict, $"{filePath} - {targetLanguageCode}");
            });
        }

        private async Task<IDictionary<string, object>> TranslatePropertiesRecursively(
            object obj, string targetLanguageCode, IEnumerable<string> invariableNames
        )
        {
            var dict = obj
                .GetType()
                .GetProperties()
                .ToDictionary(
                    propInfo => propInfo.Name,
                    propInfo => propInfo.GetValue(obj, null)
                );

            foreach (var key in dict.Keys.ToList())
            {
                var value = dict[key];

                if (value == null) return null;

                if (value.GetType() == typeof(string))
                {
                    var text = value as string;

                    List<string> replacedNames;
                    text = TextInvariableFormating(text, invariableNames, out replacedNames);

                    var awsTranslateResponse = await _awsTranslate.TranslateTextAsync(
                        new TranslateTextRequest
                        {
                            SourceLanguageCode = "EN",
                            TargetLanguageCode = targetLanguageCode,
                            Text = text,
                        }
                    );

                    dict[key] = TextInvariableFormated(awsTranslateResponse.TranslatedText, replacedNames);
                }
                else if (value is IEnumerable<object>)
                {
                    var enumerable = value as IEnumerable<object>;

                    var tasks = enumerable.Select(item => TranslatePropertiesRecursively(item, targetLanguageCode, invariableNames));

                    await Task.WhenAll(tasks);

                    dict[key] = tasks.Select(task => task.Result);
                }
                else if (!value.GetType().IsPrimitive || value.GetType() != typeof(decimal))
                {
                    dict[key] = await TranslatePropertiesRecursively(value, targetLanguageCode, invariableNames);
                }
            };

            return dict;
        }

        private string TextInvariableFormating(string text, IEnumerable<string> invariableNames, out List<string> replacedNames)
        {
            replacedNames = new List<string>();

            foreach (var invariableName in invariableNames)
            {
                if (text.Contains(invariableName))
                {
                    text = text.Replace(invariableName, $"{{{replacedNames.Count}}}");
                    replacedNames.Add(invariableName);
                }
            }

            return text;
        }

        private string TextInvariableFormated(string text, IEnumerable<string> invariableNames)
        {
            if (invariableNames.Any())
                text = string.Format(text, invariableNames.ToArray());

            return text;
        }
    }
}
