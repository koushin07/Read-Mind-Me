using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MessageController : ControllerBase
{
    private readonly IMessagesService _messagesService;

    public MessageController(IMessagesService messagesService)
    {
        _messagesService = messagesService;
    }


    [HttpGet("all")]
    public async Task<ActionResult<List<ConversationDto>>> GetALlConversation()
    {
        var userId = User.GetUserId();

        if (userId < 0)
        {
            return BadRequest(" no user ID");
        }
        return Ok(await _messagesService.GetConversationList(userId));
    }

    // [HttpPost]
    // public async Task<ActionResult<MessageDto>> CreateMessage(MessageRequest request)
    // {
    //     var userId = User.GetUserId();
    // }
}

