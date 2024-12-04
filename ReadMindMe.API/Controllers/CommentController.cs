
using Microsoft.AspNetCore.Mvc;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }


    [HttpPost]
    public async Task<ActionResult<CommentDto>> CreateCommentOfaPost(CommentRequest request)
    {
        var userId = User.GetUserId();
        if (userId < 0) return BadRequest("no authenticated user");
        var comment = await _commentService.CommentPost(request.PostId, request.Content, userId);
        return Ok(comment);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCommentOfaPost(int id)
    {
        await _commentService.DeleteComment(id);
        return Ok();
    }
}
