using System.Threading.Tasks;
using Amazon.S3;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.GitHub.Responses;
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
        private readonly IAmazonS3 _s3;

        public FilesController(IOptions<AppSettings> appSettings, IGitHubService gitHubService, IAmazonS3 s3)
        {
            _appSettings = appSettings.Value;
            _gitHubService = gitHubService;
            _s3 = s3;
        }

        [HttpGet]
        public async Task<GetPinnedRepositoriesResponse> Get()
        {
            var getPinnedRepositoriesResponse = await _gitHubService.GetPinnedRepositories(_appSettings.GitHub.Login);

            await _gitHubService.PutGitHubReposS3(getPinnedRepositoriesResponse.ToS3FileFormat());

            return getPinnedRepositoriesResponse;
        }
    }
}
