
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadMindMe.API.Models;
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

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
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
}
