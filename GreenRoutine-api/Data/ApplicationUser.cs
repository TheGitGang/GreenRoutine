using Microsoft.AspNetCore.Identity;

namespace TodoApi.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime DateJoined { get; set; }
        public int Leaves { get; set; } = 0;
        public Guid makeChoice { get; set; }
        public string Bio { get; set; } = "";
        public string Pronouns { get; set; } = "";

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