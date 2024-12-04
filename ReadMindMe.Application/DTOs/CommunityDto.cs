
namespace ReadMindMe.Application.DTOs;

public class CommunityDto
{
    public int Id { get; set; }
    public string slug { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }
    public List<UserCommunityDto> UserCommunities { get; set; }
    public List<ActivityDto> Activities { get; set; }
    public List<PostDto> Posts { get; set; }
    public bool isJoin { get; set; }
    public string About { get; set; }
    public List<GuidelineDto> Guidelines { get; set; }
}
