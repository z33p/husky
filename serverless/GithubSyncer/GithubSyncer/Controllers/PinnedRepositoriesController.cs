using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Services.Shared;
using Microsoft.AspNetCore.Mvc;

namespace GithubSyncer.Controllers
{
    [Route(AppRoutes.FilesController.Root)]
    public class PinnedRepositoriesController : ControllerBase
    {
        private readonly IPinnedRepositoriesFileService _githubService;

        public PinnedRepositoriesController(IPinnedRepositoriesFileService githubService)
        {
            _githubService = githubService;
        }

        [HttpGet]
        [Route(AppRoutes.FilesController.PinnedRepositories)]
        public async Task<PinnedRepositoriesFile> GetPinnedRepositories()
        {
            var pinnedRepositoriesFile = await _githubService.GetPinnedRepositoriesFile();

            return pinnedRepositoriesFile;
        }

        [HttpGet]
        [Route(AppRoutes.FilesController.PinnedRepositoriesPerLanguageCode)]
        public async Task<PinnedRepositoriesFile> GetPinnedRepositories([FromRoute] string languageCode)
        {
            var pinnedRepositoriesFile = await _githubService.GetPinnedRepositoriesFile(languageCode);

            return pinnedRepositoriesFile;
        }
    }
}
