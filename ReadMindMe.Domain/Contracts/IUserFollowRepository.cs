
using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IUserFollowRepository : IRepository<UserFollow>
{
    Task<UserFollow>  GetByFollowedAndFollowerId(int followedId, int followerId);
}
