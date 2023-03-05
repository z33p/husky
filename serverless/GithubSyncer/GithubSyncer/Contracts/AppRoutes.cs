
namespace GithubSyncer.Contracts;

public static class AppRoutes
{
    // Base
    public const string BASE_URL = "~/githubsyncer";

    public static class FilesController
    {
        public const string Root = BASE_URL + "/files";
        public const string PinnedRepositories = Root + "/pinned_repositories";
        public const string PinnedRepositoriesPerLanguageCode = Root + "/pinned_repositories/{languageCode}";
    }
}
