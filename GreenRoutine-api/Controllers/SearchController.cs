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
        public async Task<ActionResult<IEnumerable<ChallengeResultDTO>>> Search([FromBody] SearchRequest request)
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

            var userChallenges = await context.UserChallenges
                .Where (uc => uc.UserId == request.UserId)
                .ToListAsync();

            var challengeResults = results.Select(challenge => 
            {
                var userChallenge = userChallenges.FirstOrDefault(uc => uc.PersonalChallengeId == challenge.Id);
                var status = "Available for Sign-Up";

                if (userChallenge != null)
                {
                    status = userChallenge.ChallengeCompleted ? "Completed" : "Needs to be Completed";
                }

                return new ChallengeResultDTO
                {
                    Challenge = challenge,
                    Status = status,

                };
            });
            return Ok(challengeResults);
        }


    }

    public class SearchRequest
    {
        public string? Query { get; set; }
        public int? CategoryId { get; set; }
        public int? Difficulty { get; set; }
        public string UserId { get; set; }
    }

    public class ChallengeResultDTO
    {
        public Challenge Challenge { get; set; }
        public string Status { get; set;}
    }



}