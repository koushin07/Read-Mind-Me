using System;

namespace ReadMindMe.API.Models;

public class ConversationRequest
{
    public int creatorId { get; set; }
    public List<int> ParticipantsId { get; set; }
}
