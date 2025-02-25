
namespace ReadMindMe.Application.DTOs;

public class SearchDto
{
    public List<PostDto> Posts { get; set; }
    public List<UserDto> Users { get; set; }
    public List<CommunityDto> Communities { get; set; }
}
