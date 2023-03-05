using System.Collections.Generic;
using GithubSyncer.Contracts.External.Github;

namespace GithubSyncer.Contracts.External.S3
{
    public class PinnedRepositoriesFile
    {
        public IEnumerable<GithubRepository> Data { get; set; } =  Enumerable.Empty<GithubRepository>();

        public class GithubRepository
        {
            public GithubRepository(string name, string url, string description, IEnumerable<GithubLanguage> languages)
            {
                Name = name;
                Url = url;
                Description = description;
                Languages = languages;
            }

            public string Name { get; set; }
            public string Url { get; set; }
            public string Description { get; set; }
            public IEnumerable<GithubLanguage> Languages { get; set; }
        }
    }
}