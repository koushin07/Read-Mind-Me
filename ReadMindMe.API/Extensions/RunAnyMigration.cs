using Microsoft.EntityFrameworkCore;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.API.Extensions;

public static class RunAnyMigration
{
    public static void ApplyMigration(this IApplicationBuilder app)
    {
        using IServiceScope scope =app.ApplicationServices.CreateScope();
        using MyDbContext dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
        if (dbContext.Database.GetPendingMigrations().Any())
        {
            dbContext.Database.Migrate();
        }
    }
}
