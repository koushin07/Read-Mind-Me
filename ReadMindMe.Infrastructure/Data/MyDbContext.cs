using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data.Configuration;

namespace ReadMindMe.Infrastructure.Data;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions options) : base(options)
    {
    }
    public MyDbContext()
    {

    }



    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Community> Communities { get; set; }
    public DbSet<PostLike> PostLikes { get; set; }
    public DbSet<UserCommunity> UserCommunities { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Guideline> Guidelines { get; set; }
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<UserFollow> UserFollows { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Call each custom ModelBuilder configuration method
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new CommentConfiguration());
        modelBuilder.ApplyConfiguration(new PostConfiguration());
        modelBuilder.ApplyConfiguration(new CommunityConfiguration());
        modelBuilder.ApplyConfiguration(new UserCommunityConfiguration());

        modelBuilder.Entity<Community>().HasMany(c => c.Guidelines).WithOne(g => g.Community);
        modelBuilder.Entity<Guideline>().HasOne(g => g.Community).WithMany(c => c.Guidelines);



        modelBuilder.Entity<PostLike>()
        .HasKey(pl => new { pl.UserId, pl.PostId });

        modelBuilder.Entity<PostLike>()
            .HasOne(pl => pl.User)
            .WithMany(u => u.LikedPosts)
            .HasForeignKey(pl => pl.UserId).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<PostLike>()
            .HasOne(pl => pl.Post)
            .WithMany(p => p.LikedByUsers)
            .HasForeignKey(pl => pl.PostId).OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserCommunity>()
        .HasKey(uc => new { uc.UserId, uc.CommunityId });



        modelBuilder.Entity<UserCommunity>()
        .HasOne(uc => uc.User)
        .WithMany(u => u.UserCommunities).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<UserCommunity>()
        .HasOne(uc => uc.Community)
        .WithMany(c => c.UserCommunities).OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Verse>().HasOne(v => v.Post).WithOne(p => p.Verse).HasForeignKey<Verse>(v => v.PostId).IsRequired(false);

        modelBuilder.Entity<UserFollow>().HasIndex(uf => new { uf.FollowerId, uf.FollowedId }).IsUnique();

        modelBuilder.Entity<UserFollow>()
            .HasOne(uf => uf.Follower)
            .WithMany(u => u.Followers)
            .HasForeignKey(uf => uf.FollowerId).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<UserFollow>()
            .HasOne(uf => uf.Followed)
            .WithMany(u => u.Followeds)
            .HasForeignKey(uf => uf.FollowedId).OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Message>()
            .HasOne<User>(m => m.Sender)
            .WithMany(u => u.SendMessages)
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Conversation>()
            .HasMany(c => c.Participants)
            .WithOne(c => c.Conversation);
        modelBuilder.Entity<Conversation>()
            .HasMany(c => c.Messages)
            .WithOne(m => m.Conversation);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Participants)
            .WithOne(p => p.User);


    }


    public override int SaveChanges()
    {
        SetCreatedAtTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {


         SetCreatedAtTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SetCreatedAtTimestamps()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.State == EntityState.Added && e.Entity is BaseEntity);

        if (!entries.IsNullOrEmpty())
        {
            foreach (var entry in entries)
            {
                ((BaseEntity)entry.Entity).CreatedAt = DateTime.UtcNow;
            }
        }

    }
}


