using Microsoft.AspNetCore.Mvc;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ConversationController : ControllerBase
{
    private readonly IMessagesService _messageService;

    public ConversationController(IMessagesService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateConversation(ConversationRequest request)
    {
        var conversation = await _messageService.CreateConversation(request.creatorId, request.ParticipantsId);
        return Ok(conversation);
    }

    [HttpGet]
    public async Task<ActionResult<List<ConversationListDto>>> GetConversations()
    {
        var userId = User.GetUserId();
        if (userId < 0)
        {
            return BadRequest("no user ID");
        }
        var conversations = await _messageService.GetConversationList(userId);
        return Ok(conversations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ConversationListDto>> GetConversation(int id)
    {

        var conversation = await _messageService.GetConversation(id);
        if (conversation == null)
        {
            return NotFound();
        }
        return Ok(conversation);
    }



}
