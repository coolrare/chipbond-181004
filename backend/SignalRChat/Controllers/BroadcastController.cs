using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Data;
using SignalRChat.Hubs;

namespace SignalRChat.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BroadcastController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public BroadcastController(IHubContext<ChatHub> hubContext)
        {
            this._hubContext = hubContext;
        }

        [HttpPost]
        public IActionResult Send(BroadcastMessage message)
        {
            // TODO: 讓 IHubContext<T> 發送訊息給 client 端
            this._hubContext.Clients.All.SendAsync("ReceiveMessage", "System", message.Message);
            return Ok();
        }
    }
}