namespace GreenRoutine.Models;

public class Category
{
    public int Id { get; set;}
    public string? Name { get; set;}

    public List<Challenge>? Challenges { get; set; }

    public Category () {}
    public Category (string name): this()
    {
        Name = name;
    }
}