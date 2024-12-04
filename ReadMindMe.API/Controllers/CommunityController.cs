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
public class CommunityController : ControllerBase
{
    private readonly ICommunityService _communityService;
    private readonly IMapper _mapper;

    public CommunityController(ICommunityService communityService, IMapper mapper)
    {
        _communityService = communityService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<CommunityDto>> GetAllCommunity()
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var community = await _communityService.GetCommunities(userId);
        return Ok(community);
    }
    [HttpGet("{slug}")]
    public async Task<ActionResult<CommunityDto>> GetCommunityBySlug(string slug)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var community = await _communityService.GetCommunityBySlug(slug, userId);
        if (community == null)
        {
            return NotFound();
        }
        return Ok(community);
    }
    [HttpPost]
    public async Task<ActionResult<CommunityDto>> CreateCommunity(CommunityRequest request)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var community = await _communityService.CreateCommunity(new CommunityDto()
        {
            Name = request.Name,
            Description = request.Description,
            About = request.About,
            Guidelines = request.Guidelines

        }, userId);
        return Ok(community);
    }
    [HttpPut("join/{id}")]
    public async Task<ActionResult<CommunityDto>> JoinCommunity(int id)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var community = await _communityService.JoinCommunity(id, userId);
        return Ok(community);
    }

    [HttpPost("add-post")]
    public async Task<ActionResult<PostDto>> AddPost(CommunityPostRequest request)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var communityPost = _mapper.Map<CommunityPostDto>(request);
        communityPost.Author = new UserDto()
        {
            Id = userId
        };
        var post = await _communityService.AddPost(communityPost);
        return Ok(post);
    }


}
