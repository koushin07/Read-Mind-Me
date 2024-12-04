using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class PostProfile : Profile
{
    public PostProfile()
    {
        CreateMap<Post, PostDto>()
        .ForMember(x => x.Community, opt => opt.Ignore());
        CreateMap<PostDto, Post>();
        CreateMap<PublicPostDto, Post>().ReverseMap();
        CreateMap<PostLikeDto, PostLike>()
        .ForMember(p => p.Post, opt => opt.Ignore());
        CreateMap<PostLike, PostLikeDto>()
        .ForMember(p => p.Post, opt => opt.Ignore());
        CreateMap<CommunityPostDto, Post>()
        .ReverseMap();
        // CreateMap<PostDto, Post>()
        //     .ForMember(x => x.Id, opt => opt.Ignore());
    }
}
