namespace GreenRoutine.Models;

public class Category
{
    public int Id { get; set;}
    public string? Name { get; set;}

    public ICollection<Challenge>? Challenges { get; set; }

    public virtual ICollection<GlobalChallenge> GlobalChallenges { get; set; }

    public Category () {}
    public Category (string name): this()
    {
        Name = name;
    }
}