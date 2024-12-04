
namespace ReadMindMe.Domain.Entities;

public class Comment : BaseEntity
{
    public User User { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }
    public Post Post { get; set; }
    public int PostId { get; set; }



}
