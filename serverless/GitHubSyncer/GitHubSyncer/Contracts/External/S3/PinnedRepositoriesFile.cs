using System.Collections.Generic;
using GithubSyncer.Contracts.External.Github;

namespace GithubSyncer.Contracts.External.S3
{
    public class PinnedRepositoriesFile
    {
        public IEnumerable<GithubRepository> Data { get; set; }

        public class GithubRepository
        {
            public string Name { get; set; }

            public string Url { get; set; }

            public string Description { get; set; }

            public IEnumerable<GithubLanguage> Languages { get; set; }
        }
    }
}