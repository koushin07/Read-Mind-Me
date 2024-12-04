
using Microsoft.AspNetCore.Http;

namespace ReadMindMe.Application.DTOs;

public class UserUpdateDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public IFormFile Avatar { get; set; }
}
