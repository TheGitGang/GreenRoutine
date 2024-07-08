using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class UpdateUserInforModel
    {
        [Required(ErrorMessage = "UserId is required.")]
        public string UserId { get; set; }
        [Required(ErrorMessage = "First Name is required.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required.")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress]
        public string Email { get; set; }
        public string Bio { get; set; }
        public string Pronouns { get; set; }
    }
}