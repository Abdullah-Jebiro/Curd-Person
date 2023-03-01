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


        public  string UploadFiles(IFormFile file)
        {
            string fakeFileName = Path.GetRandomFileName();
            var path = Path.Combine(Environment.CurrentDirectory ,"Uploads", fakeFileName);
            using FileStream fileStream = new(path, FileMode.Create);
            file.CopyTo(fileStream);
            return fakeFileName;
        }
        public byte[] GetFiles(string imageName)
        {
            string filePath = Path.Combine("C:\\Users\\abdullah\\Desktop\\WedApp\\WebAppApi\\WebAppApi\\Uploads", imageName);
            return File.ReadAllBytes(filePath);
        }
    }
}
