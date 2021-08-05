using System.Threading.Tasks;
using GithubSyncer.Contracts.External.GitHub.Responses;
using GithubSyncer.Contracts.External.S3;

namespace GithubSyncer.Services.Shared
{
    public interface IGitHubService
    {
        Task<GetPinnedRepositoriesResponse> GetPinnedRepositories(string login);
        Task PutGitHubReposS3(PinnedRepositoriesFile repositories);
    }
}