using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly IMapper _mapper;

    public PostController(IPostService postService, IMapper mapper)
    {
        _postService = postService;
        _mapper = mapper;
    }
    [HttpGet]
    public async Task<ActionResult<List<PostResponse>>> GetPosts()
    {
        var userId = User.GetUserId();

        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        var posts = await _postService.GetPostsAsync();
        return Ok(posts.Select(p => _mapper.Map<PostResponse>(p, opt => opt.Items["userId"] = userId)).ToList());
    }
    [HttpGet("public")]
    public async Task<ActionResult<List<PostResponse>>> GetPublicPosts()
    {
        var userId = User.GetUserId();

        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        var posts = await _postService.GetPublicPostsAsync();
        return Ok(posts.Select(p => _mapper.Map<PostResponse>(p, opt => opt.Items["userId"] = userId)).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<PostResponse>> CreatePublicPost(PostRequest request)
    {
        var userId = User.GetUserId();
        Console.WriteLine($"user {userId}");
        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        var post = _mapper.Map<PublicPostDto>(request);
        post.Author = new UserDto
        {
            Id = userId
        };
        var newPost = await _postService.CreatePost(post);
        return Ok(_mapper.Map<PostResponse>(newPost, opt => opt.Items["userId"] = userId));
    }

    [HttpPut("like/{id}")]
    public async Task<ActionResult> LikePost(int id)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        await _postService.LikePost(id, userId);
        return Ok();
    }

    [HttpPut("unlike/{id}")]
    public async Task<ActionResult> UnlikePost(int id)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        await _postService.UnlikePost(id, userId);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePost([FromRoute] int id, [FromBody] PostRequest request)
    {
        var post = _mapper.Map<PostDto>(request);
        post.Id = id;
        await _postService.UpdatePost(post);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePost(int id)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        await _postService.DeletePost(id, userId);
        return Ok();
    }
    [HttpGet("trending")]
    public async Task<ActionResult<PostResponse>> TrendingPosts()
    {
        var userId = User.GetUserId();

        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        var posts = await _postService.GetPostTrending();
        return Ok(posts.Select(p => _mapper.Map<PostResponse>(p, opt => opt.Items["userId"] = userId)).ToList());
    }

}
