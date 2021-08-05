using System.Threading.Tasks;
using Amazon.S3.Model;

namespace GithubSyncer.Helpers.Shared
{
    public interface IS3Helper
    {
        Task PutObjToS3AsJson(object obj, string key);
        Task<string> GetFileContent(GetObjectResponse getS3FileResponse);
    }
}