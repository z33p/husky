
namespace GithubSyncer.Contracts
{
    public static class AppRoutes
    {
        // Base
        public const string BASE_URL = "githubsyncer";

        public static class FilesController
        {
            public const string Root = AppRoutes.BASE_URL + "/Files";

            public const string PinnedRepositories = Root + "/PinnedRepositories";
        }
    }
}