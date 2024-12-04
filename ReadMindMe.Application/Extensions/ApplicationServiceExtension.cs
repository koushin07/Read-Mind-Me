using FluentValidation.AspNetCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReadMindMe.Application.Helper;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Application.Services;

namespace ReadMindMe.Application.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<ICommunityService, CommunityService>();
        services.AddScoped<ICommentService, CommentService>();
        services.AddFluentValidationAutoValidation();

        return services;
    }

}
