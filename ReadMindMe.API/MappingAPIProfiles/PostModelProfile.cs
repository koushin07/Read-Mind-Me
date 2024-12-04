using AutoMapper;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.MappingAPIProfiles;

public class PostModelProfile : Profile
{
    public PostModelProfile()
    {
        CreateMap<PostDto, PostResponse>()
        .ForMember(p => p.IsLike, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var userId = (int)context.Items["userId"];
            if (userId > 0)
            {

                return src.LikedByUsers.Any(pl => pl.User.Id == userId);
            }
            return false;
        }))

        .ReverseMap();
        CreateMap<PostRequest, PostDto>().ReverseMap();
        CreateMap<PostDto, PublicPostDto>().ReverseMap();
        CreateMap<PostRequest, PublicPostDto>().ReverseMap();

        CreateMap<CommunityPostRequest, CommunityPostDto>().ReverseMap();
    }
}
