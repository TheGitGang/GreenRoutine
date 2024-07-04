using GreenRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenRoutine;
using Mono.TextTemplating;

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
            return await context
                .Challenges
                .Select(c => new ChallengesDTO(c))
                .ToListAsync();
        }


    [HttpPost("create")]
    public IActionResult CreateChallenge(/*[FromBody]*/ Challenge challenge)
    {
        context.Challenges.Add(challenge);
        context.SaveChanges();
        return Ok(new {message="Challenge successfully added"});
    }


    // [HttpGet]
    // public IActionResult RenderChallengesPage()
    // {

    // }
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
    public ActionResult ProcessDeleteChallengesPage(int challengeId)
    {
        // foreach (int id in challengeIds)
        {
            Challenge? theChallenge = context.Challenges.Find(challengeId);
            if (theChallenge != null)
            {

                context.Challenges.Remove(theChallenge);
            }
        }
        context.SaveChanges();
        return Ok(new {message="Challenge successfully deleted"});
    }

}