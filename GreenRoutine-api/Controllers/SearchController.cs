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
            if (string.IsNullOrEmpty(request.Query))
            {
                return BadRequest("Query string is empty.");
            }

            var results = await context.Challenges.Where(challenge => challenge.Name.Contains(request.Query) || challenge.Description.Contains(request.Query)).ToListAsync();

            return Ok(results);
        }


    }

    public class SearchRequest
    {
        public string Query { get; set; }
    }



}