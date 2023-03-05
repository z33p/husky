using GithubSyncer.Contracts.External.Github;

namespace GithubSyncer.Contracts.External.S3;

public class PinnedRepositoriesFile
{
    public IEnumerable<GithubRepository> Data { get; set; } = Enumerable.Empty<GithubRepository>();

    public class GithubRepository
    {
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public IEnumerable<GithubLanguage> Languages { get; set; } = Enumerable.Empty<GithubLanguage>();
    }
}
