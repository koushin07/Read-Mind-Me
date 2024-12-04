using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserDto, User>().ReverseMap();
    }
}
