
using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IMessageRepository : IRepository<Message>
{
    Task<List<Message>> GetMessagesOfConversation(int conversationId);
    Task<List<Message>> GetUnReadMessagesOfConversation(int conversationId);
    Task<List<Conversation>> GetConversations(int authId);

}
