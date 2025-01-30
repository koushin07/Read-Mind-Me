
namespace ReadMindMe.Application.DTOs;

public class PostActivityDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int LikeCount { get; set; }
    public int CommentCount { get; set; }
    public DateTime CreatedAt { get; set; }

}
