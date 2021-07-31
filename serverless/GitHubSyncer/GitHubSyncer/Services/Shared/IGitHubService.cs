using System.Threading.Tasks;
using GithubSyncer.Contracts.External.GitHub.Responses;

namespace GithubSyncer.Services.Shared
{
    public interface IGitHubService
    {
        Task<GetPinnedRepositoriesResponse> GetPinnedRepositories(string login);
    }
}