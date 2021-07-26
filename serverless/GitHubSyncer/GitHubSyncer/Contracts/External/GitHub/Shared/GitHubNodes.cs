using System.Collections.Generic;

namespace GithubSyncer.Contracts.External.GitHub.Responses.Shared
{
    public class GitHubNodes<T>
    {
        public IEnumerable<T> Nodes { get; set; }

    }
}