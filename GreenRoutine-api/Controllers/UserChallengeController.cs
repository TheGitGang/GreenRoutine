using Azure.Identity;
using GreenRoutine;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;


namespace TodoApi.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class UserChallengeController : ControllerBase
{
    private readonly ChallengeDbContext context;

    public UserChallengeController(ChallengeDbContext dbContext)
    {
        context = dbContext;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserChallenges(string userId)
    {
        var userChallenges = await context.UserChallenges.Where(uc => uc.UserId == userId).Select(uc => uc.Challenge).ToListAsync();
        return Ok(userChallenges);

    }
}
}