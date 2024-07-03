using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApi.Server.Data;
using GreenRoutine.Models;

namespace GreenRoutine;

public class ChallengeDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<Category> Categories{ get; set; }

    public ChallengeDbContext(DbContextOptions<ChallengeDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}