using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TrickingLiberary.Api.Models;
using TrickingLiberary.Api.Stores;

namespace TrickingLiberary.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Tricks:ControllerBase
    {
        private readonly TrickyStore _store;

        public Tricks(TrickyStore store)
        {
            _store = store;
        }
        
        // /api/tricks
        [HttpGet]
        public IActionResult GetAll() => Ok(_store.All);
        
        // /api/tricks/{id}
        [HttpGet("{id}")]
        public IActionResult GetOne(int id) => Ok(_store.All.FirstOrDefault(e => e.Id == id));
        
        // /api/tricks
        [HttpPost]
        public IActionResult PostTrick([FromBody] Trick trick)
        {
            _store.Add(trick);
            return Ok();
        }
        
        // /api/tricks/{id}
        [HttpPut("{id}")]
        public IActionResult PutTrick(int id, [FromBody] Trick trick)
        {
            if (id != trick.Id)
            {
                return BadRequest("object does not exist");
            }

            var entity = _store.All.FirstOrDefault(e => e.Id == id);
            if (entity is null)
            {
                return BadRequest("object does not exist");
            }
            entity.Name = trick.Name;
            return Ok();
        }
        
        // /api/tricks/{id}
        [HttpDelete]
        public IActionResult DeleteTrick(int id)
        {
            var trick = _store.All.FirstOrDefault(e => e.Id == id);
            if (trick is null)
            {
                return BadRequest("object does not exist");
            }
            _store.Delete(trick);
            return Ok();
        }
    }
}