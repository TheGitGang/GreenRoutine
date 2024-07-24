using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace GreenRoutine.Models;

public class Challenge
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Difficulty { get; set; }
    public int Miles { get; set; }
    public double ElectricValue { get; set; }
    
    public TimeSpan? Length { get; set; }
    public string? Description { get; set; } 
    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public ICollection<UserChallenge> UserChallenges { get; set; } = new List<UserChallenge>();

    public Challenge(){}
    
    public Challenge(string name, int difficulty, TimeSpan length, string description) : this()
    {
        Name = name;
        Difficulty = difficulty;
        Length = length;
        Description = description;
    }

}
