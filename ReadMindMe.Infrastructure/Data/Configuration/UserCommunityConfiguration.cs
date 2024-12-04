
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.Data.Configuration;

public class UserCommunityConfiguration : IEntityTypeConfiguration<UserCommunity>
{

    public void Configure(EntityTypeBuilder<UserCommunity> builder)
    {
        builder.HasOne(uc => uc.User).WithMany(u => u.UserCommunities);
        builder.HasOne(uc => uc.Community).WithMany(u => u.UserCommunities);
    }
}
