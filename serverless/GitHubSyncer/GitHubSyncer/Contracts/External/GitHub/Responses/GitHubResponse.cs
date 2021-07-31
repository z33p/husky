using GithubSyncer.Contracts.External.GitHub.Responses.Shared;

namespace GithubSyncer.Contracts.External.GitHub.Responses
{
    public class GetPinnedRepositoriesResponse
    {
        public GitHubUser<GitHubRepository> User { get; set; }

        public class GitHubUser<T>
        {
            public PinnedItems<T> PinnedItems { get; set; }
        }

        public class GitHubRepository
        {
            public string Name { get; set; }

            public string Description { get; set; }

            public GitHubNodes<Language> Languages { get; set; }
        }

        public class Language
        {
            public string Name { get; set; }

            public string Color { get; set; }
        }
    }
}