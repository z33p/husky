namespace GitHubSyncer.Contracts
{
    public class AppSettings
    {
        public GitHubSettings GitHub { get; set; }

        public class GitHubSettings
        {
            public string Login { get; set; }

            public string AccessToken { get; set; }
        }
    }
}