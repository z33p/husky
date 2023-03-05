using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Services.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GithubSyncer.Controllers
{
    [Route(AppRoutes.FilesController.Root)]
    public class FilesController : ControllerBase
    {
        private readonly IPinnedRepositoriesFileService _githubService;

        public FilesController(IPinnedRepositoriesFileService githubService)
        {
            _githubService = githubService;
        }

        [HttpGet]
        [Route(AppRoutes.FilesController.PinnedRepositories)]
        public async Task<PinnedRepositoriesFile> PinnedRepositories()
        {
            var pinnedPinnedRepositoriesFile = await _githubService.GetAndSyncPinnedRepositoriesFile();

            return pinnedPinnedRepositoriesFile;
        }
    }
}
