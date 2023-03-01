using Grpc.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using WebAppApi.Services;

namespace WebAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {


        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromServices] IFilesService filesService)
        {
            string nameFile = filesService.UploadFiles(file);
            return Ok(new { imageName = nameFile });
        }

        [HttpGet("GetImage")]
        public ActionResult GetImage(string imageName ,[FromServices] IFilesService filesService)
        {
            return File(filesService.GetFiles(imageName), "image/jpeg");
        }
    }
}
