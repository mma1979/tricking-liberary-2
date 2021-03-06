using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Net.Http.Headers;

namespace TrickingLiberary.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideosController:ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public VideosController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet("{video}")]
        public IActionResult GetVideo(string video)
        {
            var savPath = Path.Combine(_env.WebRootPath, "videos", video);
             var fileStream = new FileStream(savPath, FileMode.Open, FileAccess.Read);
             var provider = new FileExtensionContentTypeProvider();
             provider.TryGetContentType(video, out var contentType);
            return new FileStreamResult(fileStream, contentType);
        }
        
        
        [HttpPost]
        public async Task<IActionResult> UploadVideo(IFormFile video)
        {
            var mime = video.FileName.Split('.').Last();
            var fileName = string.Concat(Path.GetRandomFileName(), ".", mime);
            var savPath = Path.Combine(_env.WebRootPath, "videos", fileName);

            await using var stream = new FileStream(savPath, FileMode.Create, FileAccess.Write);
            await video.CopyToAsync(stream);

            return Ok(fileName);
        }
    }
}