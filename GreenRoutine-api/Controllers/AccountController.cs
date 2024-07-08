using System.Security.Claims;
using GreenRoutine;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc;
using TodoApi.Server.Data;
using TodoApi.Server.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ChallengeDbContext context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ChallengeDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            context = dbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid user data");
            }

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                DateJoined = DateTime.Now,
                Leaves = 0,
                Bio = "",
                Pronouns = "",
                LifetimeLeaves = 0,
                CurrentStreak = 0,
                LongestStreak = 0,
                NumChallengesComplete = 0,
                NumChallengesCreated = 0
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully"});
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("updateUserInfo")]
        public async Task<IActionResult> UpdateUserInfo(UpdateUserInforModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid user info");
            }

            var user = await context.Users.FindAsync(model.UserId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Bio = model.Bio;
            user.Email = model.Email;
            user.Pronouns = model.Pronouns;

            try
            {
                await context.SaveChangesAsync();
                await _signInManager.RefreshSignInAsync(user);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }

            var updatedUser = new {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName,
                user.Bio,
                user.Leaves,
                user.DateJoined,
                user.Pronouns,
                user.LifetimeLeaves,
                user.CurrentStreak,
                user.LongestStreak,
                user.NumChallengesComplete,
                user.NumChallengesCreated
            };

            return Ok(updatedUser);
        }

        [HttpGet("IsUserAuthenticated")]
        public async Task<IActionResult> IsUserAuthenticated()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok();
            } else
            {
                return Unauthorized(new { message = "User in not authenticated"});
            }
        }
    }
}