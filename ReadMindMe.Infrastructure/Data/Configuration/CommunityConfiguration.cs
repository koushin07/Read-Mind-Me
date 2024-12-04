using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.Data.Configuration;

public class CommunityConfiguration : IEntityTypeConfiguration<Community>
{

    public void Configure(EntityTypeBuilder<Community> builder)
    {
        builder.HasMany(c => c.Activities).WithOne(uc => uc.Community);
        builder.HasMany(c => c.Posts).WithOne(uc => uc.Community);
    }
}
