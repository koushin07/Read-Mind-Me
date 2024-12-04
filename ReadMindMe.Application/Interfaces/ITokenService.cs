using ReadMindMe.Application.DTOs;

namespace ReadMindMe.Application.Interfaces;

public interface ITokenService
{
    string CreateToken(UserDto user);

}
