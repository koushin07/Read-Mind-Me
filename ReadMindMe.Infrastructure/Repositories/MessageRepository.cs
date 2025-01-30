using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly MyDbContext _context;

    public MessageRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(Message entity)
    {
        throw new NotImplementedException();
    }

    public Task<List<Message>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<Message> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Conversation>> GetConversations(int authId)
    {
        var conversations = await _context.Conversations
         .Include(c => c.Participants)
         .ThenInclude(p => p.User)
         .Include(c => c.Messages)
         .ThenInclude(m => m.Sender)
            .Where(c => c.Participants.Any(p => p.UserId == authId))
            .ToListAsync();
        return conversations;
    }

    public async Task<List<Message>> GetMessagesOfConversation(int conversationId)
    {
        return await _context.Messages
            .Include(m => m.Sender)
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Message>> GetUnReadMessagesOfConversation(int conversationId)
    {
        return await _context.Messages
        .Include(m => m.Sender)
        .Where(m => m.ConversationId == conversationId && m.ReadAt == null)
        .ToListAsync();
    }

    public async Task<Message> Insert(Message entity)
    {
        var message = await _context.Messages.AddAsync(entity);
        return message.Entity;
    }

    public Task Update(Message entity)
    {
        _context.Messages.Update(entity);
        return Task.CompletedTask;
    }
}
