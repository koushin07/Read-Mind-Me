
namespace ReadMindMe.Application.DTOs;

public class UserDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Email { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
    public bool IsFollowed { get; set; }
    public int PostsCount { get; set; }
    public string Bio { get; set; }
    public string Password { get; set; }
    public string Avatar { get; set; }
    public List<PostActivityDto> PostActivities { get; set; }
    public List<JoinedCommunityDto> Communities { get; set; }
    public DateTime CreatedAt { get; set; }
}
