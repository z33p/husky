namespace GithubSyncer.Contracts
{
    public class AppEnvironment
    {
        public readonly string GithubAccessToken;

        public AppEnvironment(string githubAccessToken)
        {
            GithubAccessToken = githubAccessToken;
        }
    }
}