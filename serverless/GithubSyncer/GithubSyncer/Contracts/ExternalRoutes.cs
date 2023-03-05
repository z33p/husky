using GithubSyncer.Contracts.Shared;

namespace GithubSyncer.Contracts;

public class ExternalRoutes : IExternalRoutes
{
    public string GithubApiGraphQL { get; } = "https://api.github.com/graphql";

}
