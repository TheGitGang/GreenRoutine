using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class CreateChallengeRequestModel
    {
        [Required(ErrorMessage = "Sender is required.")]
        public required string Sender { get; set; }
        [Required(ErrorMessage = "Receiver is required.")]
        public required string Receiver { get; set; }
        public int? PersonalChallengeId { get; set; }
        public int? GlobalChallengeId { get; set; }
        [MaxLength(250, ErrorMessage = "Message has a max length of 250 characters.")]
        public string? Message { get; set; }
        public int? WageredLeaves { get; set; }
    }
}