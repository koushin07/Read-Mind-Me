using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class ParticipantRepository : IParticipantRepository
{
    private readonly MyDbContext _context;

    public ParticipantRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(Participant entity)
    {
        throw new NotImplementedException();
    }

    public Task<List<Participant>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<Participant> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Participant> GetByUserAndConversation(int userId, int conversationId)
    {
        return await _context.Participants.FirstOrDefaultAsync(p => p.UserId == userId && p.ConversationId == conversationId);
    }

    public async Task<Participant> GetByUserId(int userId)
    {
        return await _context.Participants.FirstOrDefaultAsync(p => p.UserId == userId);
    }

    public Task<Participant> Insert(Participant entity)
    {
        throw new NotImplementedException();
    }

    public Task Update(Participant entity)
    {
        throw new NotImplementedException();
    }
}
