using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TodoApi.Server.Data;

namespace GreenRoutine.Models;

public class GlobalChallenge
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Difficulty { get; set; }
    public int? Miles { get; set; }
    public TimeSpan? TimeSpan { get; set; }
    public string? Description { get; set; } 
    [ForeignKey("Category")]
    public int CategoryId { get; set; }
    public Category Category { get; set; }

    [ForeignKey("CreateByUser")]
    public string CreatedBy { get; set; }
    public ApplicationUser CreatedByUser { get; set; }

    public GlobalChallenge(){}
    
    public GlobalChallenge(string name, int difficulty, TimeSpan length, string description) : this()
    {
        Name = name;
        Difficulty = difficulty;
        TimeSpan = length;
        Description = description;
    }

}