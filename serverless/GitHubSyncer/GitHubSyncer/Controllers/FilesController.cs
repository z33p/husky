using System.Threading.Tasks;
using Amazon.S3;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Services.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GithubSyncer.Controllers
{
    [Route(AppRoutes.FilesController.Root)]
    public class FilesController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IGithubService _githubService;
        private readonly IAmazonS3 _s3;

        public FilesController(IOptions<AppSettings> appSettings, IGithubService githubService, IAmazonS3 s3)
        {
            _appSettings = appSettings.Value;
            _githubService = githubService;
            _s3 = s3;
        }

        [HttpGet]
        [Route(AppRoutes.FilesController.PinnedRepositories)]
        public async Task<PinnedRepositoriesFile> PinnedRepositories()
        {
            var pinnedRepositoriesFile = await _githubService.GetAndSyncPinnedRepositoriesFile();

            return pinnedRepositoriesFile;
        }

        [HttpGet]
        [Route(AppRoutes.FilesController.PinnedRepositoriesPerLanguageCode)]
        public async Task<PinnedRepositoriesFile> PinnedRepositories([FromRoute] string languageCode)
        {
            var pinnedRepositoriesFile = await _githubService.GetAndSyncPinnedRepositoriesFile(languageCode);

            return pinnedRepositoriesFile;
        }
    }
}
