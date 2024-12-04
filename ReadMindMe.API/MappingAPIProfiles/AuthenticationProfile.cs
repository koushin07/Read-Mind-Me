using AutoMapper;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.MappingAPIProfiles;

public class AuthenticationProfile : Profile
{
    public AuthenticationProfile()
    {
        CreateMap<LoginRequest, UserDto>()
            .ForMember(u => u.Email, opt => opt.MapFrom(l => l.Email))
            .ForMember(u => u.Password, opt => opt.MapFrom(l => l.Password))
            .ForMember(u => u.Avatar, opt => opt.Ignore()).ReverseMap();

        CreateMap<UserDto, RegisterRequest>()
            .ForMember(u => u.Email, opt => opt.MapFrom(r => r.Email))
            .ForMember(u => u.Name, opt => opt.MapFrom(r => r.Name))
            .ForMember(u => u.Password, opt => opt.MapFrom(r => r.Password))
            .ForMember(u => u.ConfirmPassword, opt => opt.Ignore()).ReverseMap();

        CreateMap<UserDto, AuthenticatedResponse>();

        CreateMap<UserUpdateDto, UpdateUserRequest>().ReverseMap();
    }
}
