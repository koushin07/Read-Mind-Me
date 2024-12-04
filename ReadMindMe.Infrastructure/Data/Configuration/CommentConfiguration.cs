
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.Data.Configuration;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{

    //  modelBuilder.Entity<Comment>()
    //         .HasOne(c => c.Post)
    //         .WithMany(p => p.Comments)
    //         .HasForeignKey(c => c.PostId);
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.HasOne(c => c.Post).WithMany(p => p.Comments).OnDelete(DeleteBehavior.Cascade); ;

    }
}
