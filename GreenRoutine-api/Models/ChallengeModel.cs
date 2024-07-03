using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace GreenRoutine.Models;

public class Challenge
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Difficulty { get; set; }
    public TimeSpan? Length { get; set; }
    public string? Description { get; set; } 
    public string Impact { get; set; }
    public List<Category>? Categories { get; set; } = [];

    public Challenge(){}
    
    public Challenge(string name, int difficulty, TimeSpan length, string description) : this()
    {
        Name = name;
        Difficulty = difficulty;
        Length = length;
        Description = description;
    }
    
    public Challenge(string name, int difficulty, TimeSpan length, string description, string Impact) : this()
    {
        Name = name;
        Difficulty = difficulty;
        Length = length;
        Description = description;
        Impact = Impact;

    }

}
