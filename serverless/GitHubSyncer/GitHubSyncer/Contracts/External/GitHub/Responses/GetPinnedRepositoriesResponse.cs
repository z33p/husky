using System.Linq;
using GithubSyncer.Contracts.External.GitHub.Responses.Shared;
using GithubSyncer.Contracts.External.S3;

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

            public GitHubNodes<GitHubLanguage> Languages { get; set; }
        }

        public PinnedRepositoriesFile ToS3FileFormat()
        {
            var repositories = this.User.PinnedItems.Edges.Select(e => new PinnedRepositoriesFile.GitHubRepository
            {
                Name = e.Node.Name,
                Description = e.Node.Description,
                Languages = e.Node.Languages.Nodes,
            });

            return new PinnedRepositoriesFile
            {
                Data = repositories
            };
        }
    }
}