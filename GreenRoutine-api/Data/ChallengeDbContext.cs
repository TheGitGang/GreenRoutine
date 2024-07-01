using Microsoft.EntityFrameworkCore;

namespace GreenRoutine;

public class ChallengeDbContext : DbContext
{
    public DbSet<Challenge> Challenges { get; set; }
}