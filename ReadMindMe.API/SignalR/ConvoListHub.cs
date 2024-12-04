using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ReadMindMe.API.SignalR;

[Authorize]
public class ConvoListHub : Hub
{

}
