using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase 
    {
        private readonly ChallengeDbContext context;

        public SearchController(ChallengeDbContext challengeDbContext) 
        {
            context = challengeDbContext;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Challenge>>> Search([FromBody] SearchRequest request)
        {
            if (!string.IsNullOrEmpty(request.Query))
            {

                var query = context.Challenges.AsQueryable();

                //filter by query
                query = query.Where(x => x.Name.Contains(request.Query) || x.Description.Contains(request.Query));

                if(!string.IsNullOrEmpty(request.Difficulty))
                {
                    query = query.Where(x => x.Difficulty == int.Parse(request.Difficulty));
                }

                var results = await query.ToListAsync();
                return Ok(results);   
            }

            
            return BadRequest("Query string is empty.");
        }


    }

    public class SearchRequest
    {
        public string Query { get; set; }
        public string? Category { get; set; }
        public string? Difficulty { get; set; }
    }



}