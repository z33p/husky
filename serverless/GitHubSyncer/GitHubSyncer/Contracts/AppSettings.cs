namespace GithubSyncer.Contracts
{
    public class AppSettings
    {
        public GithubSettings Github { get; set; }
        public S3Buckets Buckets { get; set; }

        public class S3Buckets
        {
            public string Husky { get; set; }

        }

        public class GithubSettings
        {
            public string Login { get; set; }

        }
    }
}