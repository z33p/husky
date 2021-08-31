using System.Collections.Generic;
using GithubSyncer.Contracts.External.GitHub;

namespace GithubSyncer.Contracts.External.S3
{
    public class PinnedRepositoriesFile
    {
        public IEnumerable<GitHubRepository> Data { get; set; }

        public class GitHubRepository
        {
            public string Name { get; set; }

            public string Url { get; set; }

            public string Description { get; set; }

            public IEnumerable<GitHubLanguage> Languages { get; set; }
        }
    }
}