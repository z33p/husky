using System.IO;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using GithubSyncer.Helpers.Shared;
using GitHubSyncer.Contracts;
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

        public async Task AddObjToS3AsJson(object obj, string key)
        {
            var json = JsonConvert.SerializeObject(obj);

            var s3File = new PutObjectRequest
            {
                BucketName = _appSettings.Buckets.Husky,
                Key = key,
                InputStream = new MemoryStream(Encoding.UTF8.GetBytes(json)),
                ContentType = "application/json"
            };

            var putResponse = await _s3.PutObjectAsync(s3File);
        }
    }
}