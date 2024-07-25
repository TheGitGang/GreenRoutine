using Azure.Identity;
using GreenRoutine;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;


namespace TodoApi.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class UserChallengeController : ControllerBase
{
    private readonly ChallengeDbContext context;
     private readonly UserManager<ApplicationUser> _userManager;

    public UserChallengeController(ChallengeDbContext dbContext, UserManager<ApplicationUser> userManager)
    {
        context = dbContext;
        _userManager = userManager;
    }



    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserChallenges(string userId)
    {
            var userChallenges = await context.UserChallenges.Where(uc => uc.UserId == userId).Select(uc => new UserChallengeDTO
            {
                ChallengeId = uc.PersonalChallengeId ?? uc.GlobalChallengeId.Value,
                ChallengeType = uc.PersonalChallengeId.HasValue ? "Personal" : "Global",
                UserId = uc.UserId,
                ChallengeCompleted = uc.ChallengeCompleted
            }).ToListAsync();

        return Ok(userChallenges);
    }

    [HttpPost("completeChallenge")]
    public async Task<IActionResult> CompleteUserChallenge([FromBody] UserChallengeRequest request)
    { 
        try
        {
            Console.WriteLine($"Received request to add points to user: {request.UserId}");
            var userChallenge = await context.UserChallenges.FirstOrDefaultAsync(uc => uc.PersonalChallengeId == request.ChallengeId && uc.UserId == request.UserId) ?? throw new Exception("User challenge not found");
                userChallenge.ChallengeCompleted = true;
            await context.SaveChangesAsync();

            return Ok("Challenge marked as completed");

        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("dates")]
     public async Task<ActionResult<IEnumerable<string>>> GetMarkedDates()
    {
        var greenDates = await context.UserChallenges.Where(c => c.ChallengeCompleted).Select(c => c.SignupDate)
                                        .Select(md => md.Date.ToString("yyyy-MM-dd"))
                                        .ToListAsync();
        var yellowDates = await context.UserChallenges.Where(c => c.ChallengeCompleted == false).Select(c => c.SignupDate)
                                        .Select(md => md.Date.ToString("yyyy-MM-dd"))
                                        .ToListAsync();
        var result = new
        {
            GreenDates = greenDates,
            YellowDates = yellowDates
        };
        Console.WriteLine(result);
        return Ok(result);
    }

}
    public class UserChallengeDTO
    {
        public int ChallengeId { get; set; }
        public string ChallengeType { get; set; }
        public string UserId { get; set; }
        public bool? ChallengeCompleted { get; set; }
    }

    public class UserChallengeRequest
    {
        public int ChallengeId { get; set; }
        public string UserId { get; set; }

    }
    public class markedDates
    {
        public List<string> green { get; set; }

    }
}

