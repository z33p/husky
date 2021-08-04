namespace GitHubSyncer.Contracts
{
    public class AppSettings
    {
        public GitHubSettings GitHub { get; set; }
        public S3Buckets Buckets { get; set; }

        public class S3Buckets
        {
            public string Husky { get; set; }

        }

        public class GitHubSettings
        {
            public string Login { get; set; }

        }
    }
}