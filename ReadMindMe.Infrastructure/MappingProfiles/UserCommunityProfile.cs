
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class UserCommunityProfile : Profile
{
    public UserCommunityProfile()
    {
        CreateMap<UserCommunity, UserCommunityDto>()
        .ForMember(x => x.Community, opt => opt.Ignore())
        .ReverseMap();
    }
}
