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
            var query = context.Challenges.AsQueryable();

            if (!string.IsNullOrEmpty(request.Query))
            {
                //filter by query
                query = query.Where(x => x.Name.Contains(request.Query) || x.Description.Contains(request.Query));

            }

            if(request.CategoryId.HasValue)
            {
                //filter by category id
                query = query.Where(x => x.CategoryId == request.CategoryId.Value);
            }

            if(request.Difficulty.HasValue)
            {
                //filter by difficulty
                query = query.Where(x => x.Difficulty == request.Difficulty.Value);
            }

            var results = await query.ToListAsync();
            return Ok(results);
        }


    }

    public class SearchRequest
    {
        public string? Query { get; set; }
        public int? CategoryId { get; set; }
        public int? Difficulty { get; set; }
    }



}