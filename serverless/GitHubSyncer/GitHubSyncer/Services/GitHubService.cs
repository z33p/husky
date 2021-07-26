using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using GithubSyncer.Contracts.External.GitHub.Responses;
using GithubSyncer.Contracts.Shared;
using GithubSyncer.Services.Shared;
using GitHubSyncer.Contracts;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.Extensions.Options;

namespace GitHubSyncer.Services
{
    public class GitHubService : IGitHubService
    {
        private readonly AppSettings _appSettings;
        public readonly IExternalRoutes _externalRoutes;
        public readonly GraphQLHttpClient _githubGraphQLClient;

        public GitHubService(IOptions<AppSettings> appSettings, IExternalRoutes externalRoutes)
        {
            _appSettings = appSettings.Value;
            _externalRoutes = externalRoutes;

            _githubGraphQLClient = GetGraphQLHttpClient(_appSettings, _externalRoutes);
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

        public async Task<GetPinnedRepositoriesResponse> GetPinnedRepositories(string login)
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
    }
}
