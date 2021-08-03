using System.Threading.Tasks;
using Amazon.S3;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Services.Shared;
using GitHubSyncer.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GitHubSyncer.Controllers
{
    [Route(AppRoutes.FilesController.Root)]
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
        [Route(AppRoutes.FilesController.PinnedRepositories)]
        public async Task<PinnedRepositoriesFile> Get()
        {
            var pinnedRepositoriesFile = await _gitHubService.GetAndSyncPinnedRepositoriesFile();

            return pinnedRepositoriesFile;
        }
    }
}
