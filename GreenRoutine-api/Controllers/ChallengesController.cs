using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GreenRoutine;

public class ChallengesController : Controller
{
    private readonly ChallengeDbContext context;

    public ChallengesController(ChallengeDbContext dbContext)
    {
        context = dbContext;
    }

    // [HttpGet]
    // public IActionResult RenderChallengesPage()
    // {

    // }
}