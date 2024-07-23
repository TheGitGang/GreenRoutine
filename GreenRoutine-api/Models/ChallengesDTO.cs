using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TodoApi;

namespace GreenRoutine.Models;

public class ChallengesDTO
{
    public string? Name { get; set; }
    public int Miles { get; set; }
    public double ElectricValue { get; set; }
    public int Difficulty { get; set; }
    public TimeSpan? Length { get; set; }
    public string? Description { get; set; } 
    public int CategoryId { get; set; }

    public ChallengesDTO(){}
    public ChallengesDTO(Challenge challenges) 
    {
        Name = challenges.Name;
        Difficulty = challenges.Difficulty;
        Length = challenges.Length;
        Description = challenges.Description;
        Miles = challenges.Miles;
        ElectricValue = challenges.ElectricValue;
        CategoryId = challenges.CategoryId;
    }

}