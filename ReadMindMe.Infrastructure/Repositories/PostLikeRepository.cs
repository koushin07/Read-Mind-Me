using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class PostLikeRepository : IPostLikeRepository
{
    private readonly MyDbContext _context;

    public PostLikeRepository(MyDbContext context)
    {
        _context = context;
    }

    public Task Delete(PostLike entity)
    {
        _context.PostLikes.Remove(entity);
        return Task.CompletedTask;
    }

    public Task<List<PostLike>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<PostLike> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<PostLike?> GetByUserAndPostID(int userId, int postid)
    {
        return _context.PostLikes.FirstOrDefaultAsync(p => p.UserId == userId && p.PostId == postid);
    }

    public Task<PostLike> Insert(PostLike entity)
    {
        throw new NotImplementedException();
    }

    public Task Update(PostLike entity)
    {
        throw new NotImplementedException();
    }
}
