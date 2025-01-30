using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IParticipantRepository : IRepository<Participant>
{
    Task<Participant> GetByUserAndConversation(int userId, int conversationId);
    Task<Participant> GetByUserId(int userId);
}
