using ReadMindMe.Application.DTOs;
namespace ReadMindMe.Application.Interfaces;

public interface IUserService
{
    Task Register(UserDto userDto);
    Task<UserDto> Login(UserDto userDto);
    Task<UserDto> UpdateUser(UserUpdateDto userDto);
}
