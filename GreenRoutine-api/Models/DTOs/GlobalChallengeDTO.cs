using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TodoApi.Server.Data;

namespace GreenRoutine.Models;
public class GlobalChallengeDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Difficulty { get; set; }
    public int? Miles { get; set; }
    public TimeSpan? TimeSpan { get; set; }
    public string Description { get; set; }
    public int CategoryId { get; set; }
    public string Category { get; set; }
    public string CreatedBy { get; set; }
}