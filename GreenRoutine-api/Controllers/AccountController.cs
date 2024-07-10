using System.Security.Claims;
using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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


        //Point System items
        [HttpPost("add-leaves")]
        public async Task<IActionResult> AddPoints([FromBody] string userId, int points)
        {
            try
            {
                Console.WriteLine($"Received request to add points to user: {userId}");
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }

            user.Leaves += points;
            var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok (user);
                }
                else 
                {
                    return BadRequest(result.Errors);
                } 
            }
            catch (Exception ex)
            {
                return BadRequest( new { message = ex.Message });
            }
        }

        [HttpPost("UploadProfilePhoto")]
        public async Task<IActionResult> UploadProfilePhoto([FromForm] UploadProfilePhotoModel model)
        {
            if (model.ProfilePhoto == null || model.ProfilePhoto.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var profilePhoto = new ProfilePhoto
            {
                Photo = await ConvertToByteArray(model.ProfilePhoto),
                ContentType = model.ProfilePhoto.ContentType,
                UserId = model.UserId
            };

            var existingPhoto = await context.ProfilePhotos.SingleOrDefaultAsync(p => p.UserId == model.UserId);
            if (existingPhoto != null)
            {
                existingPhoto.Photo = profilePhoto.Photo;
                existingPhoto.ContentType = profilePhoto.ContentType;
            }
            else
            {
                context.ProfilePhotos.Add(profilePhoto);
            }

            await context.SaveChangesAsync();

            return Ok(new { message = "Profile photo uploaded successfully." });
        }

        [HttpGet("{userId}/getUserPhoto")]
        public async Task<IActionResult> GetUserPhoto(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found...");
            }

            var profilePhoto = await context.ProfilePhotos.SingleOrDefaultAsync(p => p.UserId == userId);
            if (profilePhoto == null)
            {
                return NotFound("User does not have a profile photo");
            }

            var base64Photo = Convert.ToBase64String(profilePhoto.Photo);
            var photoData = $"data:{profilePhoto.ContentType};base64,{base64Photo}";

            return Ok(new { Photo = photoData });
        }

        // [HttpGet("{userId}/getUserInfo")]
        // public async Task<IActionResult> GetUserInfo(string userId)
        // {
                
        // }

        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}