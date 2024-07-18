using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models;
public class CreateRoleModel
{
    [Required(ErrorMessage = "RoleName is required.")]
    public string RoleName { get; set; }
}