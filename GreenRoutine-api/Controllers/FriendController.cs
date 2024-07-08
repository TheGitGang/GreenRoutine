using GreenRoutine;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Server.Models;
using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;
using GreenRoutine.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendController : ControllerBase
    {
        private readonly ChallengeDbContext context;
        public FriendController(ChallengeDbContext dbContext)
        {
            context = dbContext;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFriend([FromBody] AddFriendModel model)
        {
            if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.FriendUsername))
            {
                return BadRequest("UserId and FriendUsername are required.");
            }

            var user = await context.Users.FindAsync(model.UserId);
            var friend = await context.Users.SingleOrDefaultAsync(u => u.UserName == model.FriendUsername);

            if (user == null)
            {
                return NotFound("User adding friend not found");
            }

            if (friend == null)
            {
                return NotFound("Friend to add not found");
            }

            if (user.Id == friend.Id)
            {
                return BadRequest("User can not be friends with themselves.");
            }

            var existingFriendship = await context.UserFriends
                .AnyAsync(uf => (uf.UserId == model.UserId && uf.FriendId == friend.Id) ||
                                (uf.UserId == friend.Id && uf.FriendId == model.UserId));
                 
            if (existingFriendship)
            {
                return Conflict("The users are already friends.");
            }

            var userFriend = new UserFriend
            {
                UserId = model.UserId,
                FriendId = friend.Id
            };

            context.UserFriends.Add(userFriend);
            await context.SaveChangesAsync();

            string friendName = friend.FirstName + " " + friend.LastName;

            var newFriend = new {
                friendId = friend.Id,
                friendFirstName = friend.FirstName,
                friendLastName = friend.LastName,
                friendUsername = friend.UserName,
                friendLifetimeLeaves = friend.LifetimeLeaves,

            };

            return Ok(newFriend);
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveFriend([FromBody] RemoveFriendModel model)
        {
            if (string.IsNullOrEmpty(model.UserId) || string.IsNullOrEmpty(model.FriendId))
            {
                return BadRequest("UserId and FriendId are required.");
            }

            var user = await context.Users.FindAsync(model.UserId);
            var friend = await context.Users.FindAsync(model.FriendId);

            if (user == null)
            {
                return NotFound("User removing friend not found");
            }

            if (friend == null)
            {
                return NotFound("Friend to remove not found");
            }

            if (user.Id == friend.Id)
            {
                return BadRequest("User can not remove themselves.");
            }

            var friendship = await context.UserFriends
                .SingleOrDefaultAsync(uf => uf.UserId == model.UserId && uf.FriendId == model.FriendId);

            if (friendship == null)
            {
                return NotFound("Friendship not found");
            }

            context.UserFriends.Remove(friendship);
            await context.SaveChangesAsync();

            return Ok("Friend successfully removed");
        }

        [HttpGet("{userId}/friends")]
        public async Task<IActionResult> GetFriends(string userId)
        {
            var user = await context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var friends = await context.UserFriends
                .Where(uf => uf.UserId == userId)
                .Select(uf => new 
                {
                    FriendId = uf.FriendId,
                    FriendUsername = uf.Friend.UserName,
                    FriendFirstName = uf.Friend.FirstName,
                    FriendLastName = uf.Friend.LastName,
                    FriendEmail = uf.Friend.Email,
                    FriendLifetimeLeaves = uf.Friend.LifetimeLeaves
                })
                .ToListAsync();
            
            return Ok(friends);
        }

    }
}