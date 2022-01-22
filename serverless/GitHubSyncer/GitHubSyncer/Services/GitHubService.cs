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
        private readonly IExternalRoutes _externalRoutes;
        private readonly GraphQLHttpClient _githubGraphQLClient;
        private readonly IAmazonTranslate _awsTranslate;

        private const string _gitHubFolderS3Path = "GitHub";
        private const string _pinnedRepositoriesFileName = "pinned_repositories";
        private readonly string[] _targetLanguagesCodeTranslations = new string[]
        {
            "PT"
        };
        private readonly List<string> _invariableNamesList = new List<string>
        {
            // todos_server
            "TODO",

            // AuthServer
            "access tokens",
            "refresh tokens"
        };
        private readonly Dictionary<string, string> _fromToinvariableNamesList = new Dictionary<string, string>
        {
            {"HUSKY", "Husky"},
            {"ONE-STUDY-MOBILE", "One Study"},
            {"TURTLE_NOTES", "Turtle Notes"},
            {"TODOS_SERVER", "TODO's Server"},
        };

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

        public async Task<PinnedRepositoriesFile> GetAndSyncPinnedRepositoriesFile(string languageCode = null)
        {
            if (languageCode != null && !_targetLanguagesCodeTranslations.Contains(languageCode))
                throw new ArgumentException($"Webservice doesn't support this language code: {languageCode}");

            var filePath = GetS3FilePath();

            var getS3FileResponse = await _s3.GetObjectAsync(_appSettings.Buckets.Husky, filePath);
            var jsonPinnedRepositoriesFileFromS3 = await _s3Helper.GetFileContent(getS3FileResponse);

            var pinnedRepositoriesFileFromS3 = JsonConvert.DeserializeObject<PinnedRepositoriesFile>(jsonPinnedRepositoriesFileFromS3);

            var totalMinutesAfterModified = (DateTime.UtcNow - getS3FileResponse.LastModified).TotalMinutes;

            if (totalMinutesAfterModified > 30)
            {
                var pinnedRepositoriesFileFromGitHub = (await GetPinnedRepositories(_appSettings.GitHub.Login)).ToS3FileFormat();

                var invariableNamesSet = new HashSet<string>(_invariableNamesList)
                    .Union(pinnedRepositoriesFileFromGitHub.Data.Select(repo => repo.Name))
                    .Union(pinnedRepositoriesFileFromGitHub.Data.Select(repo => repo.Url))
                    .Union(GetLanguagesFromRepos(pinnedRepositoriesFileFromGitHub))
                    .ToList();

                if (languageCode == null)
                    SyncPinnedRepositoriesFilesTranslationThread(pinnedRepositoriesFileFromGitHub, invariableNamesSet);
                else
                {
                    pinnedRepositoriesFileFromGitHub = JsonConvert.DeserializeObject<PinnedRepositoriesFile>(
                        await SyncPinnedRepositoriesFileTranslation(
                            pinnedRepositoriesFileFromGitHub, languageCode, invariableNamesSet
                        )
                    );
                }

                return pinnedRepositoriesFileFromGitHub;
            }

            if (languageCode != null)
            {
                filePath = GetS3FilePath(languageCode);
                pinnedRepositoriesFileFromS3 = await _s3Helper.GetDeserializedS3Object<PinnedRepositoriesFile>(filePath);
            }

            return pinnedRepositoriesFileFromS3;
        }

        private static HashSet<string> GetLanguagesFromRepos(PinnedRepositoriesFile pinnedRepositoriesFileFromGitHub)
        {
            var languages = new HashSet<string>();

            foreach (var repo in pinnedRepositoriesFileFromGitHub.Data)
                foreach (var language in repo.Languages)
                    languages.Add(language.Name);

            return languages;
        }

        private async Task<GetPinnedRepositoriesResponse> GetPinnedRepositories(string login)
        {
            var operationName = "GetPinnedRepositories";

            var getPinnedRepositoriesReq = new GraphQLRequest
            {
                Query = @"
                    query GetPinnedRepositories($login: String!) {
                        user(login: $login) {
                            pinnedItems(first: 6, types: REPOSITORY) {
                                edges {
                                    node {
                                        ... on Repository {
                                            name
                                            url
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


        private void SyncPinnedRepositoriesFilesTranslationThread(
            PinnedRepositoriesFile pinnedRepositoriesFileFromGitHub
            , List<string> invariableNamesList
        )
        {
            new Thread(
                new ThreadStart(
                    async () => await SyncPinnedRepositoriesFilesTranslation(pinnedRepositoriesFileFromGitHub, invariableNamesList)
                )
            ).Start();
        }

        private async Task SyncPinnedRepositoriesFilesTranslation(
            PinnedRepositoriesFile repositories
            , List<string> invariableNamesList
        )
        {
            var putObjectTask = _s3Helper.PutObjToS3AsJson(repositories, GetS3FilePath());

            var tasks = _targetLanguagesCodeTranslations.Select(
                targetLanguageCode => SyncPinnedRepositoriesFileTranslation(repositories, targetLanguageCode, invariableNamesList)
            );

            await putObjectTask;
            await Task.WhenAll(tasks);
        }

        private async Task<string> SyncPinnedRepositoriesFileTranslation(
            PinnedRepositoriesFile repositories
            , string targetLanguageCode
            , List<string> invariableNamesList
        )
        {
            var fileTranslated = await GetPinnedRepositoriesFileTranslation(repositories, targetLanguageCode, invariableNamesList);

            await _s3Helper.PutObjToS3AsJson(fileTranslated, GetS3FilePath(targetLanguageCode));

            return fileTranslated;
        }

        private async Task<string> GetPinnedRepositoriesFileTranslation(
            PinnedRepositoriesFile repositories
            , string targetLanguageCode
            , List<string> invariableNamesList
        )
        {
            var dict = await TranslatePropertiesRecursively(
                    repositories,
                    targetLanguageCode,
                    invariableNamesList
                );

            return JsonConvert.SerializeObject(dict);
        }

        private async Task<IDictionary<string, object>> TranslatePropertiesRecursively(
            object obj, string targetLanguageCode, IEnumerable<string> invariableNamesList
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

                    List<string> replacedNamesList;
                    text = TextInvariableFormating(text, invariableNamesList, out replacedNamesList);

                    // When it's only one word and this word is in the invariable set this word don't need to be translated
                    if (text == "{0}")
                        continue;

                    var awsTranslateResponse = await _awsTranslate.TranslateTextAsync(
                        new TranslateTextRequest
                        {
                            SourceLanguageCode = "EN",
                            TargetLanguageCode = targetLanguageCode,
                            Text = text,
                        }
                    );

                    dict[key] = TextInvariableFormated(awsTranslateResponse.TranslatedText, replacedNamesList);
                }
                else if (value is IEnumerable<object>)
                {
                    var enumerable = value as IEnumerable<object>;

                    var tasks = enumerable.Select(item => TranslatePropertiesRecursively(item, targetLanguageCode, invariableNamesList));

                    await Task.WhenAll(tasks);

                    dict[key] = tasks.Select(task => task.Result);
                }
                else if (!value.GetType().IsPrimitive || value.GetType() != typeof(decimal))
                {
                    dict[key] = await TranslatePropertiesRecursively(value, targetLanguageCode, invariableNamesList);
                }
            };

            return dict;
        }

        private string TextInvariableFormating(string text, IEnumerable<string> invariableNameList, out List<string> replacedNamesList)
        {
            replacedNamesList = new List<string>();

            var textArr = text.Split(' ');

            for (var i = 0; i < textArr.Count(); i++)
                foreach (var invariableName in invariableNameList)
                    if (textArr[i] == invariableName)
                    {
                        textArr[i] = $"{{{replacedNamesList.Count}}}";
                        replacedNamesList.Add(invariableName);
                    }

            return string.Join(' ', textArr);
        }

        private string TextInvariableFormated(string text, IEnumerable<string> invariableNamesList)
        {
            if (invariableNamesList.Any())
            {
                invariableNamesList = invariableNamesList
                    .Select(name =>
                        {
                            if (_fromToinvariableNamesList.ContainsKey(name.ToUpper()))
                                return _fromToinvariableNamesList[name.ToUpper()];

                            return name;
                        }
                    ).ToList();

                text = string.Format(text, invariableNamesList.ToArray());
            }
            
            return text;
        }

        private string GetS3FilePath(string languageCode = null)
        {
            if (languageCode == null)
                return $"{_gitHubFolderS3Path}/{_pinnedRepositoriesFileName}.json";

            return $"{_gitHubFolderS3Path}/{_pinnedRepositoriesFileName} - {languageCode}.json";
        }
    }
}
