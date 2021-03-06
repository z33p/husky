using System.Threading.Tasks;
using GithubSyncer.Contracts.External.S3;

namespace GithubSyncer.Services.Shared
{
    public interface IGitHubService
    {
        Task<PinnedRepositoriesFile> GetAndSyncPinnedRepositoriesFile(string languageCode = null);
    }
}