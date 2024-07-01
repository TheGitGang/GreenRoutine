using Microsoft.EntityFrameworkCore;
using GreenRoutine.Models;

namespace GreenRoutine;

public class ChallengeDbContext : DbContext
{
    public DbSet<Challenge> Challenges { get; set; }
}