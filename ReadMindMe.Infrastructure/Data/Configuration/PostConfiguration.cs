
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.Data.Configuration;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{


    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasOne(p => p.Author).WithMany(s => s.Posts).HasForeignKey(p => p.AuthorId);
        builder.HasMany(p => p.Comments).WithOne(c => c.Post);
        builder.HasOne(p => p.Community).WithMany(c => c.Posts).HasForeignKey(p => p.CommunityId).IsRequired(false);
        builder.HasOne(p => p.Verse).WithOne(c => c.Post).HasForeignKey<Verse>(v => v.PostId).IsRequired(false);



    }
}
