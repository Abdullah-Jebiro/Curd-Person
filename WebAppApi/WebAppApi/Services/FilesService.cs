using Microsoft.AspNetCore.Hosting;
using WebAppApi.Data;

namespace WebAppApi.Services
{
    public class FilesService : IFilesService
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FilesService(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public string UploadFiles(IFormFile file)
        {
            var fakeFileName = Path.GetRandomFileName();
            var path = Path.Combine(Environment.CurrentDirectory+ "\\uploads", fakeFileName);
            using FileStream fileStream = new(path, FileMode.Create);
            file.CopyTo(fileStream);
            return fakeFileName;
        }
    }
}
