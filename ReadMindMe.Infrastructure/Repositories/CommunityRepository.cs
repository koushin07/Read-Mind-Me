using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class CommunityRepository : ICommunityRepository
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public CommunityRepository(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public Task Delete(Community entity)
    {
        _context.Communities.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<List<Community>> GetAll()
    {
        var communities = await _context.Communities
    .Include(x => x.UserCommunities)

    .Include(x => x.Posts)
    .Select(c => new
    {
        c,
        Activities = c.Activities
            .OrderByDescending(a => a.CreatedAt)
            .Take(5)
    })
    .ToListAsync();


        var result = communities.Select(x =>
        {
            x.c.Activities = x.Activities.ToList();
            return x.c;
        }).OrderByDescending(a => a.CreatedAt).ToList();
        return result;
    }

    public async Task<Community> GetById(int id)
    {
        return await _context.Communities.FindAsync(id);
    }

    public async Task<Community> GetCommunityBySlug(string slug)
    {
        return await _context.Communities
        .Include(x => x.UserCommunities).ThenInclude(uc => uc.User)
        .Include(x => x.Guidelines)
        .Include(x => x.Activities)
        .Include(x => x.Posts).ThenInclude(p => p.Author)
        .Include(x => x.Posts).ThenInclude(p => p.Verse)
        .Include(x => x.Posts).ThenInclude(p => p.Comments)
        .Include(x => x.Posts).ThenInclude(p => p.LikedByUsers)
        .Include(x => x.Posts).ThenInclude(p => p.Comments).ThenInclude(c => c.User)
        .FirstOrDefaultAsync(c => c.slug == slug);
    }

    public async Task<Community> Insert(Community entity)
    {
        var community = await _context.Communities.AddAsync(entity);
        return community.Entity;
    }

    public Task Update(Community entity)
    {
        _context.Update(entity);
        return Task.CompletedTask;
    }
}
