
namespace ReadMindMe.Domain.Entities;

public class Conversation : BaseEntity
{
    public ICollection<Message> Messages { get; set; } = new List<Message>();
    public ICollection<Participant> Participants { get; set; } = new List<Participant>();

}
