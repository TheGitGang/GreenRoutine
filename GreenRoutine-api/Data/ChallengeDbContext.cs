using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApi.Server.Data;
using GreenRoutine.Models;

namespace GreenRoutine;

public class ChallengeDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Challenge> Challenges { get; set; }
    public DbSet<UserChallenge> UserChallenges { get; set; }
    public DbSet<Category> Categories { get; set; }

    public DbSet<UserFriend> UserFriends { get; set; }
    public DbSet<ProfilePhoto> ProfilePhotos { get; set; }

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


        builder.Entity<UserFriend>()
            .HasKey(uf => new { uf.UserId, uf.FriendId });

        builder.Entity<UserFriend>()
            .HasOne(uf => uf.User)
            .WithMany(u => u.Friends)
            .HasForeignKey(uf => uf.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<UserFriend>()
            .HasOne(uf => uf.Friend)
            .WithMany(u => u.FriendOf)
            .HasForeignKey(uf => uf.FriendId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ApplicationUser>()
            .HasOne(a => a.ProfilePhoto)
            .WithOne(p => p.User)
            .HasForeignKey<ProfilePhoto>(p => p.UserId);
    }
}