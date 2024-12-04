
using ReadMindMe.Application.DTOs;

namespace ReadMindMe.Application.Interfaces;

public interface ICommentService
{
    Task<CommentDto> CommentPost(int postId, string content, int userId);
    Task LikeComment(int commentId);
    Task UnLikeComment(int commentId);
    Task DeleteComment(int commentId);

}
