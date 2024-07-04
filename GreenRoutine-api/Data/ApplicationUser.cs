using Microsoft.AspNetCore.Identity;

namespace TodoApi.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime DateJoined { get; set; }
        //public int? Leaves { get; set; }

        public ApplicationUser()
        {
            DateJoined = DateTime.Now;
           // Leaves = 0;
        }

        public ApplicationUser(string firstName, string lastName) : this()
        {
            FirstName = firstName;
            LastName = lastName;
        }
    }
}