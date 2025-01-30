
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ReadMindMe.API.Models;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.API.SignalR;
[Authorize]
public class MessagesHub : Hub
{
    private readonly IMessagesService _messagesService;
    private readonly IMapper _mapper;

    public MessagesHub(IMessagesService messagesService, IMapper mapper)
    {
        _messagesService = messagesService;
        _mapper = mapper;
    }
    public async override Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("UpdateConversationList");
        await base.OnConnectedAsync();
        // the user will be connected automatically when login is successful
        // var context = Context.GetHttpContext();

        // var context = Context.GetHttpContext();
        // var conversationId = context.Request.Query["conversationId"];
        // var messages = await _messagesService.OpenMessages(int.Parse(conversationId), Context.User.GetUserId());
        // await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
        // await Clients.Group(conversationId.ToString()).SendAsync("GetConversationMessages", messages, conversationId);


        // Console.WriteLine("the auth", Context.User);
        // var authId = Context.User.GetUserId();
        // var conversations = await _messagesService.GetConversationList(authId);

        // await Clients.Caller.SendAsync("GetConversationList", conversations);

        // await base.OnConnectedAsync();
    }

    public async Task ConnectConversation(string conversationId)
    {
        // var context = Context.GetHttpContext();
        // var conversationId = context.Request.Query["conversationId"];
        // var messages = await _messagesService.OpenMessages(int.Parse(conversationId), Context.User.GetUserId());
        // await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
        // await Clients.Group(conversationId.ToString()).SendAsync("GetConversationMessages", messages);
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
        var userId = Context.User.GetUserId();
        var messages = await _messagesService.OpenMessages(int.Parse(conversationId), userId);
        await Clients.Caller.SendAsync("GetConversationMessages", messages, conversationId);
    }

    public async Task JoinConversation()
    {
        var context = Context.GetHttpContext();
        var conversationId = context.Request.Query["conversationId"];
        var messages = await _messagesService.OpenMessages(int.Parse(conversationId), Context.User.GetUserId());
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId);
        await Clients.Group(conversationId.ToString()).SendAsync("GetConversationMessages", messages);
    }

    public async Task SendMessage(int conversationId, int senderId, string content)
    {
        //process message
        await _messagesService.SendMessage(conversationId, senderId, content);

        //notify clients in the conversation
        await Clients.Group(conversationId.ToString()).SendAsync("MessageRecieved", content);
        // update conversation list
        await Clients.All.SendAsync("UpdateConversationList", conversationId, content);
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var conversationId = Context.GetHttpContext().Request.Query["conversationId"];
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId);
        await base.OnDisconnectedAsync(exception);
    }

}

