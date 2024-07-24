using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TodoApi.Server.Data;
using TodoApi.Server.Models;

namespace TodoApi.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleManagementController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ChallengeDbContext _context;

        public RoleManagementController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ChallengeDbContext context)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.RoleName))
            {
                return BadRequest("Role name must be provided.");
            }
            var roleExists = await _roleManager.RoleExistsAsync(model.RoleName);
            if (!roleExists)
            {
                var roleResult = await _roleManager.CreateAsync(new IdentityRole(model.RoleName));
                if (roleResult.Succeeded)
                {
                    return Ok(new { message = $"Role {model.RoleName} created successfully" });
                }
                return BadRequest(roleResult.Errors);
            }

            return BadRequest(new { message = $"Role {model.RoleName} already exists" });
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, model.RoleName);
            if (result.Succeeded)
            {
                return Ok(new { message = $"User {model.Username} assigned to role {model.RoleName}" });
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("{userId}/IsUserAdmin")]
        public async Task<IActionResult> IsUserAdmin([FromRoute] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
            if (isAdmin)
            {
                return Ok(new { isAdmin = true });
            }
            else
            {
                return Ok(new { isAdmin = false });
            }
        }

        [HttpGet("GetGlobalChallenges")]
        public async Task<IActionResult> GetGlobalChallenges()
        {
            var globalChallenges = await _context.GlobalChallenges
                .Include(gc => gc.Category)
                .Select(gc => new GlobalChallengeDTO
                {
                    Id = gc.Id,
                    Name = gc.Name,
                    Difficulty = gc.Difficulty,
                    Miles = gc.Miles,
                    TimeSpan = gc.TimeSpan,
                    Description = gc.Description,
                    CategoryId = gc.CategoryId,
                    Category = gc.Category.Name,
                    CreatedBy = gc.CreatedBy
                })
                .ToListAsync();

            return Ok(globalChallenges);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateGlobalChallenge")]
        public async Task<IActionResult> CreateGlobalChallenge([FromBody] CreateGlobalChallengeModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var category = await _context.Categories.FindAsync(model.CategoryId);
            if (category == null)
            {
                return NotFound("Category not found");
            }

            var globalChallenge = new GlobalChallenge
            {
                CreatedBy = model.UserId,
                Name = model.Name,
                Difficulty = model.Difficulty,
                Miles = model.Miles,
                TimeSpan = model.TimeSpan,
                Description = model.Description,
                CategoryId = model.CategoryId
            };

            _context.GlobalChallenges.Add(globalChallenge);
            await _context.SaveChangesAsync();

            var challengeToSend = new {
                Id = globalChallenge.Id,
                CreatedBy = model.UserId,
                Name = model.Name,
                Difficulty = model.Difficulty,
                Miles = model.Miles,
                TimeSpan = model.TimeSpan,
                Description = model.Description,
                Category = category.Name,
                CategoryId = model.CategoryId
            };

            return Ok(challengeToSend);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("DeleteGlobalChallenge")]
        public async Task<IActionResult> DeleteGlobalChallenge(DeleteGlobalChallengeModel model)
        {
            var challenge = await _context.GlobalChallenges.FindAsync(model.ChallengeId);
            if (challenge == null)
            {
                return NotFound("Challenge not found");
            }
            _context.GlobalChallenges.Remove(challenge);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}