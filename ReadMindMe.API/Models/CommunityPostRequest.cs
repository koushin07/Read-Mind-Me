using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.Models;

public class CommunityPostRequest
{
     public string Content { get; set; }
    public VerseDto Verse { get; set; }
    public bool IsPublic { get; set; }
    public string PostType { get; set; }
    public int CommunityId { get; set; }
}
