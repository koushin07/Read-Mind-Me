
namespace ReadMindMe.Domain.Entities;

public class UserCommunity
{
    public User User { get; set; }
    public int UserId { get; set; }
    public Community Community { get; set; }
    public int CommunityId { get; set; }
}
