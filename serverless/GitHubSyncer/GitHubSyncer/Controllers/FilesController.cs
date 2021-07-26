using System.Threading.Tasks;
using GithubSyncer.Contracts;
using GithubSyncer.Services.Shared;
using GitHubSyncer.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GitHubSyncer.Controllers
{
    [Route(AppRoutes.Files)]
    public class FilesController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IGitHubService _gitHubService;
        
        public FilesController(IOptions<AppSettings> appSettings, IGitHubService gitHubService)
        {
            _appSettings = appSettings.Value;
            _gitHubService = gitHubService;
        }

        [HttpGet]
        public async Task<dynamic> Get()
        {
            var getPinnedRepositoriesResponse = await _gitHubService.GetPinnedRepositories(_appSettings.GitHub.Login);

            return getPinnedRepositoriesResponse;
        }
    }
}
