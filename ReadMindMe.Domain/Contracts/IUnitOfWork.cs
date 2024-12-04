
namespace ReadMindMe.Domain.Contracts;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IPostRepository PostRepository { get; }
    ICommentRepository CommentRepository { get; }
    IPostLikeRepository PostLikeRepository { get; }
    ICommunityRepository CommunityRepository { get; }
    IUserCommunityRepository UserCommunityRepository { get; }
    IActivityRepository ActivityRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
