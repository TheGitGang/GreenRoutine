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
                ChallengeId = uc.ChallengeId,
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
            var userChallenge = await context.UserChallenges.FirstOrDefaultAsync(uc => uc.ChallengeId == request.ChallengeId && uc.UserId == request.UserId) ?? throw new Exception("User challenge not found");
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
        Console.WriteLine("hi");
        var markedDates = await context.UserChallenges.Select(c => c.SignupDate)
                                        .Select(md => md.Date.ToString("yyyy-MM-dd"))
                                        .ToListAsync();

        Console.WriteLine(markedDates.ToString());
        return Ok(markedDates);
    }
    

}
    public class UserChallengeDTO
    {
        public int ChallengeId { get; set; }
        public string UserId { get; set; }
        public bool? ChallengeCompleted { get; set; }
    }

    public class UserChallengeRequest
    {
        public int ChallengeId { get; set; }
        public string UserId { get; set; }

    }
}
