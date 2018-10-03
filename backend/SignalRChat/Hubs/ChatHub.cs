using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public interface IChatHub
    {
        Task ReceiveMessage(string user, string message);
        Task ReceivePrivateMessage(string from, string message);
        Task ReceiveAge(object age);
        Task UserOnline(string user, int userCount);
    }

    [Authorize]
    public class ChatHub : Hub<IChatHub>
    {
        static int userCount = 0;

        public override async Task OnConnectedAsync()
        {
            ++userCount;
            await Clients.All.UserOnline(Context.UserIdentifier, userCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            --userCount;
            await Clients.All.UserOnline(Context.UserIdentifier, userCount);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.ReceiveMessage(user, message);
            // .SendAsync("ReceiveMessage", user, message);
        }

        public async Task SetAge(int age)
        {
            if (!Context.Items.ContainsKey("age"))
            {
                Context.Items.Add("age", 0);
            }
            Context.Items["age"] = age;

            await Clients.Caller.ReceiveAge(
                Context.Items.ContainsKey("age") ? Context.Items["age"] : "");
        }

        public async Task GetAge()
        {
            await Clients.Caller.ReceiveAge(
                Context.Items.ContainsKey("age") ? Context.Items["age"] : "");
        }

        public async Task SendPrivateMessage(string to, string message) {
            await Clients.User(to)
                .ReceivePrivateMessage(Context.UserIdentifier, message);
            await Clients.Caller.ReceivePrivateMessage($"To {to}", message);
        }
    }
}