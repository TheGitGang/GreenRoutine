using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class DeleteGlobalChallengeModel
    {
        [Required(ErrorMessage = "ChallengeId is required.")]
        public required int ChallengeId { get; set; }
    }
}