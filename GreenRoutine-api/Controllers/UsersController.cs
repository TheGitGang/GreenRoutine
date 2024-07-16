using Azure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;


namespace TodoApi.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> UserManager;

    public UsersController(UserManager<ApplicationUser> userManager)
    {
        UserManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await UserManager.Users.OrderByDescending(u => u.Leaves)
        .Take(5)
        .ToListAsync();

        var userDtos = users.Select(user => new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Leaves = user.Leaves
        }).ToList();

        return Ok(userDtos);

    }
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int Leaves {get; set; }

    }
}
}


