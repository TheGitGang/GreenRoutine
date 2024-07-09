using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models;
public class UploadProfilePhotoModel
{
    [Required(ErrorMessage = "UserId is required.")]
    public string UserId { get; set; }
    [Required(ErrorMessage = "ProfilePhoto is required.")]
    public IFormFile ProfilePhoto { get; set; }
}