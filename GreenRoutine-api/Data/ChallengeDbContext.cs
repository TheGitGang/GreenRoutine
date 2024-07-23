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
    public DbSet<GlobalChallenge> GlobalChallenges { get; set; }
    public DbSet<ChallengeRequest> ChallengeRequests { get; set; }

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

        builder.Entity<GlobalChallenge>()
            .HasOne(gc => gc.CreatedByUser)
            .WithMany()
            .HasForeignKey(gc => gc.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<GlobalChallenge>()
            .HasOne(gc => gc.Category)
            .WithMany(c => c.GlobalChallenges)
            .HasForeignKey(gc => gc.CategoryId);

        builder.Entity<ChallengeRequest>()
            .HasOne(cr => cr.SenderUser)
            .WithMany()
            .HasForeignKey(cr => cr.Sender)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ChallengeRequest>()
            .HasOne(cr => cr.ReceiverUser)
            .WithMany()
            .HasForeignKey(cr => cr.Receiver)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<ChallengeRequest>()
            .HasOne(cr => cr.GlobalChallenge)
            .WithMany()
            .HasForeignKey(cr => cr.GlobalChallengeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<ChallengeRequest>()
            .HasOne(cr => cr.PersonalChallenge)
            .WithMany()
            .HasForeignKey(cr => cr.PersonalChallengeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<Category>()
            .HasMany(c => c.Challenges)
            .WithOne(c => c.Category)
            .HasForeignKey(c => c.CategoryId);
    }
}