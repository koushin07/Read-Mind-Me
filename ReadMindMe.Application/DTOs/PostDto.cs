
namespace ReadMindMe.Application.DTOs;

public class PostDto
{
    public string slug { get; set; }
    public int Id { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }
    public bool IsLike { get; set; }
    public bool IsPublic { get; set; }
    public VerseDto Verse { get; set; }
    public string PostType { get; set; }
    public UserDto Author { get; set; }
    public List<PostLikeDto> LikedByUsers { get; set; }
    public List<CommentDto> Comments { get; set; }
    public CommunityDto Community { get; set; }
    public DateTime CreatedAt { get; set; }

}
