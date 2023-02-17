import httpClient from "../shared/httpClient";
import externalRoutes from "../contracts/external_routes.json";
import PinnedRepositoriesFile from "../contracts/external/pinned_repositories_file";

export default class GitHubSyncerBusiness {
    private client = httpClient();

    public async getPinnedRepositories() {
        const res = await this.client.get<PinnedRepositoriesFile>(externalRoutes.gitHubSyncer.pinnedRepositories + "PT");

        return res.data ?? [];
    }
}
