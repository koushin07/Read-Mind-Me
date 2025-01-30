
namespace ReadMindMe.Application.DTOs;

public class ConversationDto
{
    public List<MessageDto> Messages { get; set; }
    public List<ParticipantDto> Participants { get; set; }
}
