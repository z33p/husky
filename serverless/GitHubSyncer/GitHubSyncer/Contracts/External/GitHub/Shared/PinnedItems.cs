namespace GithubSyncer.Contracts.External.Github.Responses.Shared;

public class PinnedItems<T>
{
    public PinnedItems(List<GithubNode<T>> edges)
    {
        Edges = edges;
    }

    public List<GithubNode<T>> Edges { get; set; }
}