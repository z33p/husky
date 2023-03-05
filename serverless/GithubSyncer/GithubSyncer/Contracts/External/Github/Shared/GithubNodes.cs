namespace GithubSyncer.Contracts.External.Github.Responses.Shared;

public class GithubNodes<T>
{
    public IEnumerable<T> Nodes { get; set; }

    public GithubNodes(IEnumerable<T> nodes)
    {
        Nodes = nodes;
    }
}
