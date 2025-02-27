
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


    public async Task SendMessage(int conversationId, int senderId, string content)
    {
        //process message
        await _messagesService.SendMessage(conversationId, senderId, content);

        //notify clients in the conversation
        await Clients.Group(conversationId.ToString()).SendAsync("MessageRecieved", content);
        // update conversation list
        await Clients.All.SendAsync("UpdateConversationList", conversationId, content);
    }


}

