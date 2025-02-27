using GreenRoutine.Models;
using TodoApi.Server.Data;

namespace GreenRoutine;

public class UserChallenge
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }

    public int? GlobalChallengeId { get; set; }
    public Challenge Challenge { get; set; }
    public int? PersonalChallengeId { get; set; }
    public GlobalChallenge GlobalChallenge { get; set; }

    public DateTime SignupDate { get; set; } = DateTime.Now;

    public bool ChallengeCompleted { get; set; } = false;

    public string? Impact { get; set; }

    public double? Carbon_lb { get; set; }

    public double? ElectricCarbon_lb { get; set; }
}