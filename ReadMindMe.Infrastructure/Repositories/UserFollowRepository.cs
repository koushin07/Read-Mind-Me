using System;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class UserFollowRepository : IUserFollowRepository
{
    private readonly MyDbContext _context;

    public UserFollowRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(UserFollow entity)
    {
        throw new NotImplementedException();
    }

    public Task<List<UserFollow>> GetAll()
    {
        throw new NotImplementedException();
    }

    public async Task<UserFollow> GetByFollowedAndFollowerId(int followedId, int followerId)
    {
        return await _context.UserFollows.FirstOrDefaultAsync(uf => uf.FollowedId == followedId && uf.FollowerId == followerId);
    }

    public Task<UserFollow> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<UserFollow> Insert(UserFollow entity)
    {
        var userFollow = await _context.UserFollows.AddAsync(entity);
        return userFollow.Entity;
    }

    public Task Update(UserFollow entity)
    {
        throw new NotImplementedException();
    }
}
