using Amazon.S3.Model;

namespace GithubSyncer.Helpers.Shared
{
    public interface IS3Helper
    {
        Task<string> GetFileContent(GetObjectResponse getS3FileResponse);
    }
}