using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace GreenRoutine.Models;

public class Challenge
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Difficulty { get; set; }
    public TimeSpan Length { get; set; }
    public string Description { get; set; } 

    public int CategoryId { get; set; }
    public List<Category> Categories { get; set; } = [];

    public Challenge(){}
   
    
}
