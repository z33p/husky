using GithubSyncer.Contracts.External.Github.Responses.Shared;
using GithubSyncer.Contracts.External.S3;

namespace GithubSyncer.Contracts.External.Github.Responses;

public class GetPinnedRepositoriesResponse
{
    public GetPinnedRepositoriesResponse(GithubUser<GithubRepository> user)
    {
        User = user;
    }

    public GithubUser<GithubRepository> User { get; set; }

    public class GithubUser<T>
    {
        public PinnedItems<T> PinnedItems { get; set; }

        public GithubUser(PinnedItems<T> pinnedItems)
        {
            PinnedItems = pinnedItems;
        }
    }

    public class GithubRepository
    {
        public string Name { get; set; } = string.Empty;

        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public GithubNodes<GithubLanguage> Languages { get; set; } = new();
    }

    public PinnedRepositoriesFile ToS3FileFormat()
    {
        var repositories = this.User.PinnedItems.Edges.Select(e => new PinnedRepositoriesFile.GithubRepository
        {
            Name = e.Node.Name,
            Url = e.Node.Url,
            Description = e.Node.Description,
            Languages = e.Node.Languages.Nodes
        });

        return new PinnedRepositoriesFile
        {
            Data = repositories
        };
    }
}
