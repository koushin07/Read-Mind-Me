
namespace ReadMindMe.Application.DTOs;

public class ParticipantDto
{
    public string Name { get; set; }
    public UserDto User { get; set; }
    public int UserId { get; set; }
    public ConversationDto Conversation { get; set; }
}
