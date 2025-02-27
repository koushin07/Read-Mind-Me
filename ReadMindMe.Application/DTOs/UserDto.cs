
namespace ReadMindMe.Application.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Email { get; set; }
    public string Bio { get; set; }
    public string Password { get; set; }
    public string Avatar { get; set; }
    public DateTime CreatedAt { get; set; }
}
