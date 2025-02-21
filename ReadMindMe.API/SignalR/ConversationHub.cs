using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.API.SignalR;

public class ConversationHub : Hub
{
     private readonly IMessagesService _messagesService;
    private readonly IMapper _mapper;

    public ConversationHub(IMessagesService messagesService, IMapper mapper)
    {
        _messagesService = messagesService;
        _mapper = mapper;
    }

    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
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
