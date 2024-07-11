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
            var userChallenges = await context.UserChallenges.Where(uc => uc.UserId == userId).Select(uc => new UserChallengeDTO
            {
                ChallengeId = uc.ChallengeId,
                UserId = uc.UserId
            }).ToListAsync();
        return Ok(userChallenges);
    }

[HttpGet("dates")]
     public async Task<ActionResult<IEnumerable<string>>> GetMarkedDates()
        {
            Console.WriteLine("hi");
            var markedDates = await context.UserChallenges.Select(c => c.SignupDate)
                                            .Select(md => md.Date.ToString("yyyy-MM-dd"))
                                            .ToListAsync();

            return Ok(markedDates);
        }
    

}
public class UserChallengeDTO
{
    public int ChallengeId { get; set; }
    public string UserId { get; set; }
}
}
