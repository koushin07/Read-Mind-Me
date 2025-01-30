
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
    IMessageRepository MessageRepository { get; }
    IConversationRepository ConversationRepository { get; }
    IParticipantRepository ParticipantRepository { get; }
    IUserFollowRepository UserFollowRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
