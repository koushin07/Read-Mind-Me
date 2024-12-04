
namespace ReadMindMe.Application.DTOs;

public class ActivityDto
{
    public int Id { get; set; }
    public string Action { get; set; }
    public string User { get; set; }
    public CommunityDto Community { get; set; }
}
