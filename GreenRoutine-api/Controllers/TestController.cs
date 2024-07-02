using Microsoft.AspNetCore.Mvc;

namespace GreenRoutine.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly string[] _quotes = new[]
    {
        "Leave the gun. Take the cannoli.",
        "Get busy living, or get busy dying.",
        "How do you like them apples?",
        "I think this is the beginning of a beautiful friendship"
    };

    private readonly ChallengeDbContext _context;

    public TestController(ChallengeDbContext context)
    {
        _context = context;
    }


    //Get /api/test
    [HttpGet]
    public IResult Get()
    {
        return Results.Ok(_quotes);
    }

    //GET /api/test/{id}
    [HttpGet("{id}")]
    [ProducesResponseType<string>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IResult Get(int id)
    {
        if (id < 0 || id >= _quotes.Length)
        {
            return Results.NotFound("These are not the droids you are looking for.");
        }
        return Results.Ok(_quotes[id]);
    }
}
