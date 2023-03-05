namespace GithubSyncer.Contracts;

public class AppSettings
{
    public GithubSettings Github { get; set; }
    public S3Buckets Buckets { get; set; }

    public AppSettings(GithubSettings github, S3Buckets buckets)
    {
        Github = github;
        Buckets = buckets;
    }

    public class S3Buckets
    {
        public string Husky { get; set; }

        public S3Buckets(string husky)
        {
            Husky = husky;
        }
    }

    public class GithubSettings
    {
        public string Login { get; set; }

        public GithubSettings(string login)
        {
            Login = login;
        }
    }
}
