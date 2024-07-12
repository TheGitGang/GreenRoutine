using GreenRoutine.Models;
using TodoApi.Server.Data;

namespace GreenRoutine;

public class UserChallenge
{
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }

    public int ChallengeId { get; set; }
    public Challenge Challenge { get; set; }

    public DateTime SignupDate { get; set; } = DateTime.Now;

    public bool ChallengeCompleted { get; set; } = false;

    public string? Impact { get; set; }

    public double? Carbon_lb { get; set; }

}