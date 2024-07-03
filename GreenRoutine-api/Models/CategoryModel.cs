namespace GreenRoutine.Models;

public class Category
{
    public int Id { get; set;}
    public string? Name { get; set;}

    public List<Challenge>? Challenges { get; set; }

    static string CalculateImpact(int carbonEmission)
    {
        if (0 >= carbonEmission && carbonEmission <= 69)
        {
            return "low";
        }
        else if (70 >= carbonEmission && carbonEmission <= 149)
        {
            return "medium";
        }
        else if (150 >= carbonEmission)
        {
            return "high";
        }
        else
        {
            return "data not available";
        }
    }
}