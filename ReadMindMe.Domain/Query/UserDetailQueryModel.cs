using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadMindMe.Domain.Query;

public class UserDetailQueryModel
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
    public List<PostActivityQueryModel> PostActivities { get; set; }
    public List<JoinedCommunityQueryModel> Communities { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class JoinedCommunityQueryModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string slug { get; set; }
    public DateTime JoinedAt { get; set; }
}

public class PostActivityQueryModel
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int LikeCount { get; set; }
    public int CommentCount { get; set; }
    public DateTime CreatedAt { get; set; }
}
