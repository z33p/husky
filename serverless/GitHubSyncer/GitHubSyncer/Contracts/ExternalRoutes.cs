using GithubSyncer.Contracts.Shared;

namespace GithubSyncer.Contracts
{
    public class ExternalRoutes : IExternalRoutes
    {
        public string GitHubApiGraphQL { get; } = "https://api.github.com/graphql";
        
        
    }
}