

using ReadMindMe.Application.DTOs;

namespace ReadMindMe.API.Models;

public class CommunityRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string About { get; set; }
    public List<GuidelineDto> Guidelines { get; set; }
}
