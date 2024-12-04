
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class PostRepository : IPostRepository
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public PostRepository(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public Task Delete(Post entity)
    {
        _context.Posts.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<List<Post>> GetAll()
    {
        var posts = await _context.Posts
        .Include(p => p.Verse)
      .Include(p => p.Author)
      .Include(p => p.Comments)
          .ThenInclude(comment => comment.User)
            .Include(p => p.LikedByUsers).ThenInclude(lp => lp.User)
      .OrderByDescending(p => p.CreatedAt)
      .ToListAsync();


        return posts;
    }

    public async Task<Post> GetById(int id)
    {
        return await _context.Posts
        .Include(p => p.Verse)
        .Include(p => p.LikedByUsers).ThenInclude(lp => lp.User)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Post>> GetPublicPost()
    {
        var posts = await _context.Posts
        .Include(p => p.Verse)
        .Include(p => p.Author)
        .Include(p => p.Comments)
            .ThenInclude(comment => comment.User)
              .Include(p => p.LikedByUsers).ThenInclude(lp => lp.User)
         .Where(p => p.IsPublic == true)
        .OrderByDescending(p => p.CreatedAt)
        .ToListAsync();


        return posts;
    }

    public async Task<Post> Insert(Post entity)
    {
        var post = await _context.Posts.AddAsync(entity);
        return post.Entity;
    }

    public Task Update(Post entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        return Task.CompletedTask;
    }
}
