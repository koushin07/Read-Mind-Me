
namespace ReadMindMe.Application.DTOs;

public class CommentDto
{
    public int Id { get; set; }
    public UserDto User { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }

}
