
using ReadMindMe.Application.DTOs;

namespace ReadMindMe.Application.Interfaces;

public interface IMessagesService
{
    Task SendMessage(int conversationId, int senderId, string content);
    Task<List<MessageDto>> OpenMessages(int conversationId, int userId);
    Task<ConversationDto> MarkMessagesAsRead(int conversationId, int userId);
    Task<int> CreateConversation(int creatorId, List<int> participants);
    Task<List<ConversationListDto>> GetConversationList(int authId);
    Task<ConversationDto> GetConversation(int conversationId);
}
