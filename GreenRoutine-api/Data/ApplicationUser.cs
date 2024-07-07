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
        public string Bio { get; set; } = "";
        public string Pronouns { get; set; } = "";

        public ICollection<UserChallenge> UserChallenges { get; set; }

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