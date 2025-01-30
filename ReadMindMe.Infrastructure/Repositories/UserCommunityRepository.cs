
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class UserCommunityRepository : IUserCommunityRepository
{
    private readonly MyDbContext _context;

    public UserCommunityRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(UserCommunity entity)
    {
        throw new NotImplementedException();
    }

    public Task<List<UserCommunity>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<UserCommunity> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<UserCommunity> GetUserCommunityByUserAndCommunityId(int userId, int communityId)
    {
        return await _context.UserCommunities.FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CommunityId == communityId);
    }

    public async Task<UserCommunity> Insert(UserCommunity entity)
    {
        var userCommunity = await _context.UserCommunities.AddAsync(entity);
        return userCommunity.Entity;
    }

    public Task Update(UserCommunity entity)
    {
        throw new NotImplementedException();
    }
}
