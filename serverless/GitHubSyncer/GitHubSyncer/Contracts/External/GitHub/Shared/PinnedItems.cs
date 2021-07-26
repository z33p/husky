using System.Collections.Generic;

namespace GithubSyncer.Contracts.External.GitHub.Responses.Shared
{

    public class PinnedItems<T>
    {
        public List<GitHubNode<T>> Edges { get; set; }
    }
}