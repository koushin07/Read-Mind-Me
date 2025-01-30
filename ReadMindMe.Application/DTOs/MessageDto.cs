
namespace ReadMindMe.Application.DTOs;

public class MessageDto
{
    public UserDto Sender { get; set; }
    public int SenderId { get; set; }
    public string Content { get; set; }
    public DateTime? ReadAt { get; set; }
}
