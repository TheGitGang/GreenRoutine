using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class AcceptOrDeclineChallengeModel
    {
        [Required(ErrorMessage = "UserId is required.")]
        public required string UserId { get; set; }
        [Required(ErrorMessage = "ChallengeRequestId is required.")]
        public required int ChallengeRequestId { get; set; }
        [Required(ErrorMessage = "Boolean Accepted is required.")]
        public required bool Accepted { get; set; }
    }
}