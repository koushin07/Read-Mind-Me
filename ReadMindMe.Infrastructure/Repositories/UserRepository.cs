using Microsoft.EntityFrameworkCore;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Domain.Query;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly MyDbContext _context;

    public UserRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(User entity)
    {
        _context.Users.Remove(entity);
        return Task.CompletedTask;

    }

    public async Task<bool> ExistByEmail(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<List<User>> GetAll()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<UserDetailQueryModel> GetBySlug(string slug, int authId)
    {
        var userDetails = await _context.Users
     .Include(u => u.Posts) // Load related PostActivities if it's a navigation property
     .Include(u => u.UserCommunities).ThenInclude(uc => uc.Community)    // Load related Communities if it's a navigation property
     .Include(u => u.Followers)      // Load related Followers if it's a navigation property
     .Include(u => u.Followeds)
     .Select(u => new UserDetailQueryModel
     {
         Id = u.Id,
         Name = u.Name,
         Slug = u.Slug,
         Email = u.Email,
         FollowersCount = u.Followers.Count, // Compute the count dynamically
         FollowingCount = u.Followeds.Count, // Assuming Following is also a list
         PostsCount = u.Posts.Count,         // Assuming Posts is a navigation property
         Bio = u.Bio,
         IsFollowed = u.Followeds.Any(f => f.FollowedId == u.Id && f.FollowerId == authId),
         Avatar = u.Avatar,
         PostActivities = u.Posts.Select(pa => new PostActivityQueryModel
         {
             Id = pa.Id,
             Content = pa.Content,
             CreatedAt = pa.CreatedAt
         }).ToList(),
         Communities = u.UserCommunities.Select(c => new JoinedCommunityQueryModel
         {
             Id = c.Community.Id,
             slug = c.Community.slug,
             Name = c.Community.Name,
             JoinedAt = c.Community.CreatedAt
         }).ToList(),
         CreatedAt = u.CreatedAt
     })
     .FirstOrDefaultAsync(x => x.Slug == slug);
        return userDetails;

    }

    public async Task<User> Insert(User entity)
    {
        var user = await _context.Users.AddAsync(entity);
        return user.Entity;
    }

    public Task Update(User entity)
    {
        _context.Users.Update(entity);
        return Task.CompletedTask;
    }
}
