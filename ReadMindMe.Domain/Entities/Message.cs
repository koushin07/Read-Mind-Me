
namespace ReadMindMe.Domain.Entities;

public class Message : BaseEntity
{
    public User Sender { get; set; }
    public int SenderId { get; set; }
    public string Content { get; set; }
    public Conversation Conversation { get; set; }
    public int ConversationId { get; set; }
    public DateTime? ReadAt { get; set; }
}
