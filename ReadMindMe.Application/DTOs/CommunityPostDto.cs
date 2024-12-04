

using System.ComponentModel.DataAnnotations;

namespace ReadMindMe.Application.DTOs;

public class CommunityPostDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }
    public bool IsLike { get; set; }
    [AllowedValues("book", "prayer", "question", "thoughts", "guide")]

    public string PostType { get; set; }
    public VerseDto Verse { get; set; }
    public UserDto Author { get; set; }
    public int CommunityId { get; set; }
    public List<CommentDto> Comments { get; set; }
}
