using System.ComponentModel.DataAnnotations;

namespace ReadMindMe.Domain.Entities;

public class User : BaseEntity
{
    [Required]
    public string Name { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string Slug { get; set; }
    public byte[] PasswordSalt { get; set; }
    public byte[] PasswordHash { get; set; }
    public string Avatar { get; set; }
    public List<Post> Posts { get; set; }
    public List<UserCommunity> UserCommunities { get; set; }

    public List<PostLike> LikedPosts { get; set; }
    public int LikedPostId { get; set; }
    public string Bio { get; set; }

    public List<UserFollow> Followeds { get; set; }
    public List<UserFollow> Followers { get; set; }

    public List<Message> SendMessages { get; set; }
    public List<Participant> Participants { get; set; }


}
