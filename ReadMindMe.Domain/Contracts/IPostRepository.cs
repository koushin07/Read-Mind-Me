using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IPostRepository : IRepository<Post>
{
    Task<List<Post>> GetPublicPost();
}
