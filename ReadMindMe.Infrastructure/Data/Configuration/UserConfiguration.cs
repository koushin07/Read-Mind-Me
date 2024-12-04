
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.Data.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {

        builder
            .HasMany(uc => uc.Posts)
            .WithOne(u => u.Author)
            .HasForeignKey(p => p.AuthorId);



    }
}
