
using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IUserCommunityRepository : IRepository<UserCommunity>
{
    Task<UserCommunity> GetUserCommunityByUserAndCommunityId(int userId, int communityId);
}
