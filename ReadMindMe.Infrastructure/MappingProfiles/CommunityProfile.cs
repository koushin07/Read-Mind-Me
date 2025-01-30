using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class CommunityProfile : Profile
{
    public CommunityProfile()
    {
        CreateMap<Community, CommunityDto>()

        .ForMember(x => x.UserCommunities, opt => opt.MapFrom(c => c.UserCommunities))
        .ForMember(x => x.isJoin, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var userId = (int)context.Items["userId"];
            Console.WriteLine("the user", userId);
            if (userId > 0)
            {
                return src.UserCommunities.Any(uc => uc.UserId == userId);
            }
            return false;
        }));
        CreateMap<CommunityDto, Community>();


        CreateMap<Activity, ActivityDto>().ForMember(x => x.Community, opt => opt.Ignore());
        CreateMap<UserCommunity, UserCommunityDto>().ReverseMap();
        CreateMap<Guideline, GuidelineDto>().ReverseMap();
    }
}
