using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Domain.Query;

namespace ReadMindMe.Domain.Contracts;

public interface IUserRepository : IRepository<User>
{
    Task<bool> ExistByEmail(string email);

    Task<User?> GetByEmail(string email);
    Task<UserDetailQueryModel?> GetBySlug(string slug, int authId);
}
