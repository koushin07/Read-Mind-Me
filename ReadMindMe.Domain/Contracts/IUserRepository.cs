using Logiware.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Domain.Contracts;

public interface IUserRepository : IRepository<User>
{
    Task<bool> ExistByEmail(string email);

    Task<User?> GetByEmail(string email);
}
