namespace GithubSyncer.Contracts.External.Github.Responses.Shared;

public class GithubNode<T>
{
    public GithubNode(T node)
    {
        Node = node;
    }

    public T Node { get; set; }
}
