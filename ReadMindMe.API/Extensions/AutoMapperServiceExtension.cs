
using ReadMindMe.API.MappingAPIProfiles;
using ReadMindMe.Infrastructure.MappingProfiles;

namespace ReadMindMe.API.Extensions;

public static class AutoMapperServiceExtension
{
    public static IServiceCollection AddAutoMapperService(this IServiceCollection services)
    {
        services.AddAutoMapper
        (
            typeof(AuthenticationProfile),
            typeof(UserProfile),
            typeof(PostModelProfile),
            typeof(PostProfile)
        );
        return services;
    }
}
