
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public AuthenticationController(IUserService userService, IMapper mapper, ITokenService tokenService)
    {
        _userService = userService;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequest register)
    {
        var userDto = _mapper.Map<UserDto>(register);

        await _userService.Register(userDto);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthenticatedResponse>> Login(LoginRequest login)
    {
        var userDto = _mapper.Map<UserDto>(login);
        var authUser = await _userService.Login(userDto);
        var token = _tokenService.CreateToken(authUser);
        return Ok(new AuthenticatedResponse()
        {
            User = authUser,
            Token = token
        });
    }
    [HttpPost("Oauth")]
    public async Task<ActionResult<AuthenticatedResponse>> LoginViaGoogle(OAuthLogin auth)
    {
        var OAuth = _mapper.Map<OAuthRequest>(auth);
        var authUser = await _userService.LoginViaGoogle(OAuth);
        var token = _tokenService.CreateToken(authUser);
        return Ok(new AuthenticatedResponse()
        {
            User = authUser,
            Token = token
        });
    }
}
