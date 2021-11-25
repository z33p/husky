export default interface PinnedRepositoriesFile {
    data: Array<GitHubRepository>;
}

export interface GitHubRepository {
    name: string;
    description: string;
    url: string;
    languages: Array<GitHubLanguage>;
}

export interface GitHubLanguage {
    name: string
    color: string
}