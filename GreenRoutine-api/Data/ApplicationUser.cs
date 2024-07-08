using GreenRoutine.Models;
using Microsoft.AspNetCore.Identity;
using GreenRoutine;

namespace TodoApi.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime DateJoined { get; set; }
        public int Leaves { get; set; } = 0;
        public int LifetimeLeaves { get; set; } = 0;
        public int CurrentStreak { get; set; } = 0;
        public int LongestStreak { get; set; } = 0;
        public int NumChallengesComplete { get; set; } = 0;
        public int NumChallengesCreated { get; set; } = 0;
        public string Bio { get; set; } = "";
        public string Pronouns { get; set; } = "";

        public ICollection<UserChallenge> UserChallenges { get; set; }

        public virtual ICollection<UserFriend> Friends { get; set; }
        public virtual ICollection<UserFriend> FriendOf { get; set; }


        public ApplicationUser()
        {
            DateJoined = DateTime.Now;
        }

        public ApplicationUser(string firstName, string lastName) : this()
        {
            FirstName = firstName;
            LastName = lastName;
        }
    }
}