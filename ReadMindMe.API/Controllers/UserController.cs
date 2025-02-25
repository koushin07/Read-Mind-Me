
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReadMindMe.API.Models;
using ReadMindMe.API.SignalR;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    private readonly IHubContext<NotificationHub> _hubContext;

    public UserController(IUserService userService, IMapper mapper, IHubContext<NotificationHub> hubContext)
    {
        _userService = userService;
        _mapper = mapper;
        _hubContext = hubContext;
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> Update(UpdateUserRequest request)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var user = _mapper.Map<UserUpdateDto>(request);
        user.Id = userId;

        var result = await _userService.UpdateUser(user);
        Console.WriteLine(request);
        return Ok(result);
    }

    [HttpGet("profile/{slug}")]
    public async Task<ActionResult<UserDetailDto>> GetUserBySlug(string slug)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var user = await _userService.GetUserDetail(slug, userId);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet("follow/{id}")]
    public async Task<ActionResult> FollowUser(int id)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        await _userService.FollowUser(userId, id);
        var name = User.GetUserName();
        await _hubContext.Clients.User(id.ToString())
            .SendAsync("ReceiveNotification", $"User {name} is following you");
        return Ok();
    }

    [HttpGet("search/{searchTerm}")]
    public async Task<ActionResult<SearchDto>> SearchAll(string searchTerm)
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var search = await _userService.SearchAll(searchTerm,userId);
        return Ok(search);
    }

}
