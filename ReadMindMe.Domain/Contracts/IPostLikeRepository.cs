
using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IPostLikeRepository : IRepository<PostLike>
{
    Task<PostLike> GetByUserAndPostID(int userId, int postId);
}
