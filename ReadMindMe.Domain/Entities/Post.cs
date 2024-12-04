using System.ComponentModel.DataAnnotations;

namespace ReadMindMe.Domain.Entities;

public class Post : BaseEntity
{
    public string slug { get; set; }
    public string Content { get; set; }
    public int Likes { get; set; }

    public bool IsPublic { get; set; }
    public Verse? Verse { get; set; }
    [AllowedValues("book", "prayer", "question", "thoughts", "guide")]
    public string PostType { get; set; }
    public User Author { get; set; }
    public int AuthorId { get; set; }

    public List<PostLike> LikedByUsers { get; private set; } = new List<PostLike>();
    public Community Community { get; set; }
    public int? CommunityId { get; set; }
    public List<Comment> Comments { get; set; } = new List<Comment>();



    public void LikePost(int userId)
    {
        if (!LikedByUsers.Any(l => l.UserId == userId))
        {
            Likes++;

            LikedByUsers.Add(new PostLike { PostId = Id, UserId = userId });
        }
        else
        {
            throw new InvalidOperationException("The post is already Like");
        }

    }

    public void CommentPost(Comment comment)
    {
        if (Comments.Contains(comment)) throw new InvalidOperationException("Comment post already exists");
        Comments.Add(comment);
    }

    public void DeleteComment(Comment comment)
    {
        if (Comments.Contains(comment)) throw new InvalidOperationException("Comment is already deleted");
        Comments.Remove(comment);
    }



    public void SharePost(Community community)
    {
        Community = community;
        IsPublic = false;
    }

    public void UnsharePost()
    {
        Community = null;
        IsPublic = true;
    }

    public void EditPost(string content)
    {
        Content = content;
    }



}
