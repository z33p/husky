using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Amazon.S3;
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
        public readonly IExternalRoutes _externalRoutes;
        public readonly GraphQLHttpClient _githubGraphQLClient;
        public const string GitHubFolderS3Path = "GitHub";
        public const string _pinnedRepositoriesFileName = "pinned_repositories";

        public GitHubService(IOptions<AppSettings> appSettings, IExternalRoutes externalRoutes, IS3Helper s3Helper, IAmazonS3 s3)
        {
            _s3 = s3;
            _appSettings = appSettings.Value;
            _externalRoutes = externalRoutes;

            _githubGraphQLClient = GetGraphQLHttpClient(_appSettings, _externalRoutes);

            _s3Helper = s3Helper;
        }

        private GraphQLHttpClient GetGraphQLHttpClient(AppSettings appSettings, IExternalRoutes externalRoutes)
        {
            var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", appSettings.GitHub.AccessToken);

            var graphQLOptions = new GraphQLHttpClientOptions
            {
                EndPoint = new Uri(externalRoutes.GitHubApiGraphQL)
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
                                            languages(first: 2) {
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

        private async Task PutGitHubReposS3(PinnedRepositoriesFile repositories)
        {
            var filePath = $"{GitHubFolderS3Path}/{_pinnedRepositoriesFileName}";

            await _s3Helper.PutObjToS3AsJson(repositories, filePath);
        }

        public async Task<PinnedRepositoriesFile> GetAndSyncPinnedRepositoriesFile()
        {
            var filePath = $"{GitHubFolderS3Path}/{_pinnedRepositoriesFileName}";

            var getS3FileResponse = await _s3.GetObjectAsync(_appSettings.Buckets.Husky, filePath);

            var jsonPinnedRepositoriesFileFromS3 = await _s3Helper.GetFileContent(getS3FileResponse);

            var pinnedRepositoriesFileFromS3 = JsonConvert.DeserializeObject<PinnedRepositoriesFile>(jsonPinnedRepositoriesFileFromS3);

            var totalMinutesAfterModified = (DateTime.UtcNow - getS3FileResponse.LastModified).TotalMinutes;

            if (totalMinutesAfterModified > 30)
            {
                var pinnedRepositoriesFileFromGitHub = (await GetPinnedRepositories(_appSettings.GitHub.Login)).ToS3FileFormat();
                var jsonPinnedRepositoriesFileFromGitHub = JsonConvert.SerializeObject(pinnedRepositoriesFileFromGitHub);

                if (jsonPinnedRepositoriesFileFromS3 != jsonPinnedRepositoriesFileFromGitHub)
                    await PutGitHubReposS3(pinnedRepositoriesFileFromGitHub);
            }

            return pinnedRepositoriesFileFromS3;
        }
    }
}
