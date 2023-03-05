using Amazon.S3;
using GithubSyncer.Contracts;
using GithubSyncer.Contracts.External.S3;
using GithubSyncer.Contracts.Shared;
using GithubSyncer.Helpers.Shared;
using GithubSyncer.Services.Shared;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GithubSyncer.Services;

public class PinnedRepositoriesFileService : IPinnedRepositoriesFileService
{
    public readonly IAmazonS3 _s3;
    private readonly IS3Helper _s3Helper;
    private readonly AppSettings _appSettings;
    private readonly AppEnvironment _appEnvironment;
    private readonly IExternalRoutes _externalRoutes;

    public PinnedRepositoriesFileService(
        IAmazonS3 s3
        , IS3Helper s3Helper
        , IOptions<AppSettings> appSettings
        , AppEnvironment appEnvironment
        , IExternalRoutes externalRoutes
    )
    {
        _s3 = s3;
        _s3Helper = s3Helper;
        _appSettings = appSettings.Value;
        _appEnvironment = appEnvironment;
        _externalRoutes = externalRoutes;

    }

    private const string _githubFolderPath = "Github";
    private const string _pinnedPinnedRepositoriesFileName = "pinned_repositories";
    private const string _pinnedPinnedRepositoriesFilePath = _githubFolderPath + "/" + _pinnedPinnedRepositoriesFileName + ".json";

    public async Task<PinnedRepositoriesFile> GetPinnedRepositoriesFile()
    {
        return await GetPinnedRepositoriesFileByPath(_pinnedPinnedRepositoriesFilePath);
    }

    public async Task<PinnedRepositoriesFile> GetPinnedRepositoriesFile(string languageCode)
    {
        return await GetPinnedRepositoriesFileByPath(ResolvePath(languageCode));
    }

    private async Task<PinnedRepositoriesFile> GetPinnedRepositoriesFileByPath(string filePath)
    {
        var getS3FileResponse = await _s3.GetObjectAsync(_appSettings.Buckets.Husky, filePath);
        var jsonPinnedRepositoriesFileFromS3 = await _s3Helper.GetFileContent(getS3FileResponse);

        var pinnedPinnedRepositoriesFileFromS3 = JsonConvert.DeserializeObject<PinnedRepositoriesFile>(jsonPinnedRepositoriesFileFromS3);

        return pinnedPinnedRepositoriesFileFromS3;
    }

    public string ResolvePath(string languageCode) => $"{_githubFolderPath}/{_pinnedPinnedRepositoriesFileName} - {languageCode}.json";
}
