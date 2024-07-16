using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models;
public class AssignRoleModel
{
    [Required(ErrorMessage = "Username is required.")]
    public string Username { get; set; }
    [Required(ErrorMessage = "RoleName is required.")]
    public string RoleName { get; set; }
}