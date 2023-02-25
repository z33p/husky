using System.Collections.Generic;

namespace GithubSyncer.Contracts.External.Github.Responses.Shared
{

    public class PinnedItems<T>
    {
        public List<GithubNode<T>> Edges { get; set; }
    }
}