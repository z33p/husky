namespace GithubSyncer.Contracts
{
    public class AppEnvironment
    {
        public readonly string GitHubAccessToken;

        public AppEnvironment(string gitHubAccessToken)
        {
            GitHubAccessToken = gitHubAccessToken;
        }
    }
}