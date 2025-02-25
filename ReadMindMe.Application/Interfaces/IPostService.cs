using ReadMindMe.Application.DTOs;

namespace ReadMindMe.Application.Interfaces;

public interface IPostService
{
    Task<List<PostDto>> GetPostsAsync();
    Task<List<PostDto>> GetPublicPostsAsync();
    Task<List<PostDto>> GetPostTrending();
    Task<PostDto> CreatePost(PublicPostDto postDto);
    Task LikePost(int id, int userId);

    Task UnlikePost(int id, int userId);

    Task AddCommentToPost(int id, string textContent);

    Task UpdatePost(PostDto postDto);
    Task DeletePost(int id, int userId);



}
