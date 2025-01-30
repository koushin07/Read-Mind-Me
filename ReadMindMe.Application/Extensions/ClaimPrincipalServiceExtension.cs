
using System.Security.Claims;

namespace ReadMindMe.Application.Extensions;

public static class ClaimPrincipalServiceExtension
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
    }
    public static string GetUserEmail(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.Email)?.Value;
    }
    public static string GetUserName(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.Name)?.Value;
    }
}
