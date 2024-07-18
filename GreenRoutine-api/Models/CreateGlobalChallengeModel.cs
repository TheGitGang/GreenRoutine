using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class CreateGlobalChallengeModel
    {
        [Required(ErrorMessage = "UserId is required")]
        public required string UserId { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public required string Name { get; set; }
        [Required(ErrorMessage = "Difficulty is required")]
        public required int Difficulty { get; set; }
        public int? Miles { get; set; }
        public TimeSpan? TimeSpan { get; set; }
        public string? Description { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public required string Category { get; set; }
    }
}