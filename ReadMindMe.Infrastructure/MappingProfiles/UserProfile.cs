using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Domain.Query;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserDto, User>().ReverseMap();
        CreateMap<UserDetailQueryModel, UserDetailDto>().ReverseMap();
        CreateMap<PostActivityQueryModel, PostActivityDto>().ReverseMap();
        CreateMap<JoinedCommunityQueryModel, JoinedCommunityDto>().ReverseMap();

    }
}
