

using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.Models;

public class CommunityResponse
{
    public string slug { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }
    public List<UserCommunityDto> UserCommunities { get; set; }
    public List<ActivityDto> Activities { get; set; }
    public List<PostDto> Posts { get; set; }
}
