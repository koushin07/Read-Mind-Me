using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class ConversationRepository : IConversationRepository
{
    private readonly MyDbContext _context;

    public ConversationRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(Conversation entity)
    {
        throw new NotImplementedException();
    }

    public Task<List<Conversation>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task<Conversation> GetById(int id)
    {
        return await _context.Conversations
        // .Include(c => c.Participants)

        .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Conversation> Insert(Conversation entity)
    {
        var conversation = await _context.Conversations.AddAsync(entity);
        return conversation.Entity;
    }

    public Task Update(Conversation entity)
    {
        throw new NotImplementedException();
    }
}
