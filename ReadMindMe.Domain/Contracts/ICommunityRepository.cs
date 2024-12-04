
using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface ICommunityRepository : IRepository<Community>
{
    Task<Community> GetCommunityBySlug(string slug);
}
