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

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Challenge>>> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query string is empty.");
            }

            var results = await context.Challenges.Where(challenge => challenge.Name.Contains(query) || challenge.Description.Contains(query)).ToListAsync();

            return Ok(results);
        }


    }



}