using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.Models;

public class PostRequest
{
    public string Content { get; set; }
    public VerseDto Verse { get; set; }

    public string PostType { get; set; }
}
