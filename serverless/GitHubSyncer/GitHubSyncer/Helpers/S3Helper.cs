using System.IO;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using GithubSyncer.Helpers.Shared;
using GithubSyncer.Contracts;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GithubSyncer.Handlers
{
    public class S3Helper : IS3Helper
    {
        public readonly AppSettings _appSettings;
        public readonly IAmazonS3 _s3;

        public S3Helper(IOptions<AppSettings> appSettings, IAmazonS3 s3)
        {
            _appSettings = appSettings.Value;
            _s3 = s3;
        }

        public async Task<string> GetFileContent(GetObjectResponse getObjectResponse)
        {
            var buffer = new byte[getObjectResponse.ResponseStream.Length];

            await getObjectResponse.ResponseStream.ReadAsync(buffer);

            var content = Encoding.UTF8.GetString(buffer);

            return content;
        }
    }
}