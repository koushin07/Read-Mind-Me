
namespace ReadMindMe.Domain.Entities;

public class Participant : BaseEntity
{
    public string Name { get; set; }
    public User User { get; set; }
    public int UserId { get; set; }
    public Conversation Conversation { get; set; }
    public int ConversationId { get; set; }

}
