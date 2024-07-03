using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TodoApi;

namespace GreenRoutine.Models;

public class ChallengesDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? Difficulty { get; set; }
    public TimeSpan? Length { get; set; }
    public string? Description { get; set; } 
    public List<Category>? Categories { get; set; } = [];

    
    public ChallengesDTO(Challenge challenges) 
    {
        Name = challenges.Name;
        Difficulty = challenges.Difficulty;
        Length = challenges.Length;
        Description = challenges.Description;
    }

}
