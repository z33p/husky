using GithubSyncer.Contracts.External.S3;

namespace GithubSyncer.Services.Shared;

public interface IPinnedRepositoriesFileService
{
    Task<PinnedRepositoriesFile> GetPinnedRepositoriesFile();
    Task<PinnedRepositoriesFile> GetPinnedRepositoriesFile(string languageCode);
}