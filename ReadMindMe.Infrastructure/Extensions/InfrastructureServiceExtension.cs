using Microsoft.Extensions.DependencyInjection;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Infrastructure.Data;
using ReadMindMe.Infrastructure.MappingProfiles;
using ReadMindMe.Infrastructure.Repositories;

namespace ReadMindMe.Infrastructure.Extensions;

public static class InfrastructureServiceExtension
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICommunityRepository, CommunityRepository>();

        services.AddAutoMapper(cfg =>
        {
            cfg.AddProfile<UserProfile>();
        });
        return services;
    }
}
