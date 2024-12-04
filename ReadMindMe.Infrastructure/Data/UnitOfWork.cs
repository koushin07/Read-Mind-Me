using AutoMapper;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Infrastructure.Repositories;

namespace ReadMindMe.Infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public UnitOfWork(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public IUserRepository UserRepository => new UserRepository(_context);
    public IPostRepository PostRepository => new PostRepository(_context, _mapper);

    public ICommentRepository CommentRepository => new CommentRepository(_context, _mapper);
    public IPostLikeRepository PostLikeRepository => new PostLikeRepository(_context);
    public ICommunityRepository CommunityRepository => new CommunityRepository(_context, _mapper);
    public IUserCommunityRepository UserCommunityRepository => new UserCommunityRepository(_context);
    public IActivityRepository ActivityRepository => new ActivityRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
