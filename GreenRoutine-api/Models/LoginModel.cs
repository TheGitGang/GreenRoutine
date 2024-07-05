using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Username is required.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}