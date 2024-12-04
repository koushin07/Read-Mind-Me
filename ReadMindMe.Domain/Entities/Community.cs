
namespace ReadMindMe.Domain.Entities;

public class Community : BaseEntity
{
    public string slug { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }
    public string About { get; set; }
    public List<UserCommunity> UserCommunities { get; set; } = new List<UserCommunity>();
    public List<Activity> Activities { get; set; } = new List<Activity>();
    public List<Post> Posts { get; set; } = new List<Post>();
    public List<Guideline> Guidelines { get; set; } = new List<Guideline>();

    public void AddMember(User user)
    {
        if (user is null) throw new ArgumentException(nameof(user) + " is null");
        UserCommunities.Add(new UserCommunity { Community = this, User = user });

        logActivity(user.Name, "Joined the community");
    }

    private void logActivity(string name, string action)
    {
        Activities.Add(new Activity()
        {
            User = name,
            Action = action,

        });
    }

    public void AddPost(Post post)
    {
        if (post is null) throw new ArgumentException(nameof(post) + " is null");
        Posts.Add(post);
        var action = post.PostType switch
        {
            "book" => "shared a Bible verse",
            "prayer" => "asked for prayer",
            "thoughts" => "post some thoughts",
            "question" => "asked questions",
            "guide" => "post some guide",
            _ => "has some activity",
        };
        logActivity(post.Author.Name, action);

    }
}
