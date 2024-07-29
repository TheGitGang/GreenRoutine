using System.ComponentModel.DataAnnotations.Schema;
using TodoApi.Server.Data;

namespace GreenRoutine.Models;

public class ChallengeRequest
{
    public int Id { get; set; }
    public bool? Accepted { get; set; }
    [ForeignKey("GlobalChallenge")]
    public int? GlobalChallengeId { get; set; }
    public GlobalChallenge? GlobalChallenge { get; set; }
    [ForeignKey("PersonalChallenge")]
    public int? PersonalChallengeId { get; set; }
    public Challenge? PersonalChallenge { get; set; }
    [ForeignKey("SenderUser")]
    public required string Sender { get; set; }
    public ApplicationUser SenderUser { get; set; }
    [ForeignKey("ReceiverUser")]
    public required string Receiver { get; set; }
    public ApplicationUser ReceiverUser { get; set; }
    public string? Message { get; set; }
    public int? WageredLeaves { get; set; }

    public ChallengeRequest()
    {

    }

    public ChallengeRequest(string message, int wageredLeaves)
    {
        Message = message;
        WageredLeaves = wageredLeaves;
    }
}