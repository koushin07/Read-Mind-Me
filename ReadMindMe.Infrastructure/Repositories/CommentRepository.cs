using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public CommentRepository(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public Task Delete(Comment entity)
    {
        _context.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<List<Comment>> GetAll()
    {

        var comments = await _context.Comments.ProjectTo<CommentDto>(_mapper.ConfigurationProvider).ToListAsync();
        return comments.Select(_mapper.Map<Comment>).ToList();
    }

    public async Task<Comment> GetById(int id)
    {
        return await _context.Comments.FindAsync(id);

    }

    public async Task<Comment> Insert(Comment entity)
    {
        var comment = await _context.Comments.AddAsync(entity);
        return comment.Entity;
    }

    public Task Update(Comment entity)
    {
        _context.Update(entity);
        return Task.CompletedTask;
    }
}
