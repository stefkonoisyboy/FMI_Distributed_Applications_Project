using API.Attributes;
using API.Extensions;
using API.Hubs;
using AutoMapper;
using Core.Dtos;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace API.Controllers
{
    [CustomAuthorize]
    public class VoiceCallsController : ApiController
    {
        private readonly IHubContext<ChatHub> chatHub;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public VoiceCallsController(IHubContext<ChatHub> chatHub, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this.chatHub = chatHub;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpPost("{userId}")]
        public async Task<ActionResult> Call([FromRoute] string userId)
        {
            var currentUser = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            var user = this.mapper.Map<ApplicationUser, UserDto>(currentUser);

            await this.chatHub.Clients.All
                .SendAsync($"VoiceCall/{userId}", JsonSerializer.Serialize(user));

            return this.NoContent();
        }

        [HttpPost("call-ended/{userId}")]
        public async Task<ActionResult> CallEnded([FromRoute] string userId)
        {
            await this.chatHub.Clients.All
                .SendAsync($"VoiceCallEnded/{userId}");

            return this.NoContent();
        }
    }
}
