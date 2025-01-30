
namespace ReadMindMe.Application.DTOs;

public class ConversationListDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public string Avatar { get; set; }
    public int UnReadCount { get; set; }
    public string UserName { get; set; }
}
