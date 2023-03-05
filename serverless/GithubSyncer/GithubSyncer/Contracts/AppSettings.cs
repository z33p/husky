namespace GithubSyncer.Contracts;

public class AppSettings
{
    public GithubSettings Github { get; set; } = new();
    public S3Buckets Buckets { get; set; } = new();

    public class S3Buckets
    {
        public string Husky { get; set; } = string.Empty;
    }

    public class GithubSettings
    {
        public string Login { get; set; } = string.Empty;
    }
}
