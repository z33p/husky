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
        public GithubRepository(string name, string url, string description, GithubNodes<GithubLanguage> languages)
        {
            Name = name;
            Url = url;
            Description = description;
            Languages = languages;
        }

        public string Name { get; set; }

        public string Url { get; set; }
        public string Description { get; set; }

        public GithubNodes<GithubLanguage> Languages { get; set; }
    }

    public PinnedRepositoriesFile ToS3FileFormat()
    {
        var repositories = this.User.PinnedItems.Edges.Select(e => new PinnedRepositoriesFile.GithubRepository(
            e.Node.Name,
            e.Node.Url,
            e.Node.Description,
            e.Node.Languages.Nodes
        ));

        return new PinnedRepositoriesFile
        {
            Data = repositories
        };
    }
}
