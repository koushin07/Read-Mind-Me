using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ReadMindMe.Application.Extensions;

namespace ReadMindMe.API.SignalR;

[Authorize]
public class PresenceHub : Hub
{
    private readonly PresenceTracker _tracker;

    public PresenceHub(PresenceTracker tracker)
    {
        _tracker = tracker;
    }
    public override async Task OnConnectedAsync()
    {
        if (Context.User == null) throw new HubException("Cannot get current user claim");

        var isOnline = await _tracker.UserConnected(Context.User.GetUserEmail(), Context.ConnectionId);
        if (isOnline) await Clients.Others.SendAsync("UserIsOnline", Context.User?.GetUserEmail());

        var currentUsers = await _tracker.GetOnlineUsers();
        await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (Context.User == null) throw new HubException("Cannot get current user claim");

        var isOffline = await _tracker.UserDisconnected(Context.User.GetUserEmail(), Context.ConnectionId);
        if (isOffline) await Clients.Others.SendAsync("UserIsOffline", Context.User?.GetUserEmail());

        await base.OnDisconnectedAsync(exception);
    }

}
