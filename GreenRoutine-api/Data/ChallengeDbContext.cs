using Microsoft.EntityFrameworkCore;
using GreenRoutine.Models;

namespace GreenRoutine;

public class ChallengeDbContext : DbContext
{
    public DbSet<Challenge> Challenges { get; set; }

    public ChallengeDbContext(DbContextOptions options): base(options)
    {}
}