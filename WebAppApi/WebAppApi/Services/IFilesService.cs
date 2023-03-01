
namespace WebAppApi.Services
{
    public interface IFilesService
    {
        string UploadFiles(IFormFile file);
        byte[] GetFiles(string imageName);
    }
}