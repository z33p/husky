using System.Threading.Tasks;

namespace GithubSyncer.Helpers.Shared
{
    public interface IS3Helper
    {
        Task AddObjToS3AsJson(object obj, string key);
    }
}