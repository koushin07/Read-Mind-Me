using ReadMindMe.Application.DTOs;

namespace ReadMindMe.Application.Interfaces;

public interface ICommunityService
{
    Task<List<CommunityDto>> GetCommunities(int userId);
    Task<CommunityDto> GetCommunityBySlug(string slug, int userId);
    Task<CommunityDto> CreateCommunity(CommunityDto community, int userId);
    Task UpdateCommunity(CommunityDto community);
    Task DeleteCommunity(int communityId);
    Task<CommunityDto> JoinCommunity(int communityId, int userId);
    Task<PostDto> AddPost(CommunityPostDto communityPost);
}
