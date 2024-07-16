using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public RoleManagementController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
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
    }
}