using GreenRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenRoutine;
using Mono.TextTemplating;
using TodoApi.Server.Models;

namespace TodoApi;

[Route("api/[controller]")]
[ApiController]
public class ChallengesController : ControllerBase
{
    private readonly ChallengeDbContext context;

    public ChallengesController(ChallengeDbContext dbContext)
    {
        context = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ChallengesDTO>>> RenderChallengesPage()
    {
        return await 
            context.Challenges
            .Select(c => new ChallengesDTO(c))
            .ToListAsync();
    }


    [HttpPost("create")]
    public IActionResult CreateChallenge(Challenge challenge)
    {
        if (challenge == null)
        {
            return BadRequest("Challenge data is null");
    
        }

        var category = context.Categories.Find(challenge.CategoryId);
        if (category == null)
        {
            return BadRequest("Invalid category ID");
        }
        

        context.Challenges.Add(challenge);
        context.SaveChanges();
        return Ok(new {message="Challenge successfully added"});
    }
    
    [HttpGet("delete")]
    public async Task<ActionResult<IEnumerable<ChallengesDTO>>>RenderDeleteChallengesPage()
    {
        List<Challenge> challenges = context.Challenges.OrderBy(c => c.Name).ToList();
            return await context
                .Challenges
                .Select(c => new ChallengesDTO(c))
                .ToListAsync();
    }

    [HttpPost("delete")]

    public ActionResult ProcessDeleteChallengesPage(Challenge challenge)
    {
        // foreach (int id in challengeIds)
        {

            Challenge? theChallenge = context.Challenges.Find(challenge.Id);
            if (theChallenge != null)
            {

                context.Challenges.Remove(theChallenge);
            }
        }
        context.SaveChanges();
        return Ok(new {message="Challenge successfully deleted"});
    }


    [HttpPost("signup")]
    public async Task<IActionResult> SignUpForChallenge([FromBody] SignUpRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.UserId))
        {
            return BadRequest("Invalid Request");
        }

        var userChallenge = new UserChallenge
        {
            UserId = request.UserId,
            ChallengeId = request.ChallengeId
        };

        context.UserChallenges.Add(userChallenge);
        await context.SaveChangesAsync();

        return Ok(new { message = "User signed up for challenge successfully"});
    }
   
}