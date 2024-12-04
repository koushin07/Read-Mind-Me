using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.Models;

public class AuthenticatedResponse
{
    public UserDto User { get; set; }
    public string Token { get; set; }
}
