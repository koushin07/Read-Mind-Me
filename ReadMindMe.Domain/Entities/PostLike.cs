
namespace ReadMindMe.Domain.Entities;

public class PostLike
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int PostId { get; set; }
    public Post Post { get; set; }
}
