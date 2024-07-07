using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApi.Server.Data;
using GreenRoutine.Models;

namespace GreenRoutine;

public class ChallengeDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<UserChallenge> UserChallenges { get; set; }
    public DbSet<Category> Categories{ get; set; }

    public ChallengeDbContext(DbContextOptions<ChallengeDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserChallenge>()
            .HasKey (uc => new { uc.UserId, uc.ChallengeId});

        builder.Entity<UserChallenge>()
            .HasOne(uc => uc.User)
            .WithMany(uc => uc.UserChallenges)
            .HasForeignKey(uc => uc.UserId);

        builder.Entity<UserChallenge>()
            .HasOne(uc => uc.Challenge)
            .WithMany(c => c.UserChallenges)
            .HasForeignKey(uc => uc.ChallengeId);
    }
}