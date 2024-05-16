using AngleSharp.Io;
using API.Attributes;
using API.Errors;
using API.Extensions;
using API.Hubs;
using Core.Dtos;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace API.Controllers
{
    [CustomAuthorize]
    public class MessagesController : ApiController
    {
        private readonly IMessageService messageService;
        private readonly IConversationService conversationService;
        private readonly IHubContext<ChatHub> chatHub;
        private readonly UserManager<ApplicationUser> userManager;

        public MessagesController(
            IMessageService messageService,
            IConversationService conversationService,
            IHubContext<ChatHub> chatHub,
            UserManager<ApplicationUser> userManager)
        {
            this.messageService = messageService;
            this.conversationService = conversationService;
            this.chatHub = chatHub;
            this.userManager = userManager;
        }

        [HttpGet("{conversationId}")]
        public async Task<ActionResult<IReadOnlyList<MessageDto>>> AllByConversation([FromRoute] int conversationId)
        {
            if (!await this.conversationService.FindByIdAsync(conversationId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.CONVERSATION_NOT_FOUND));
            }

            var response = await this.messageService
                .GetAllByConversationIdAsync(conversationId);

            return this.Ok(response);
        }

        [HttpPost("{conversationId}")]
        public async Task<ActionResult> CreateForConversation([FromRoute] int conversationId, [FromBody] CreateMessageDto messageDto)
        {
            if (!await this.conversationService.FindByIdAsync(conversationId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.CONVERSATION_NOT_FOUND));
            }

            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            messageDto.ConversationId = conversationId;
            messageDto.SenderId = user.Id;

            var response = await this.messageService
                .CreateAsync(messageDto);

            if (response == null)
            {
                return this.BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, Constants.MESSAGE_NOT_CREATED));
            }

            await this.chatHub.Clients.All
                .SendAsync("ReceiveMessage", JsonSerializer.Serialize(response));

            return this.CreatedAtAction(nameof(this.CreateForConversation), response);
        }

        [HttpPatch("{conversationId}")]
        public async Task<ActionResult> MarkAsReadForConversation([FromRoute] int conversationId)
        {
            if (!await this.conversationService.FindByIdAsync(conversationId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status400BadRequest, Constants.CONVERSATION_NOT_FOUND));
            }

            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            await this.messageService.MarkAsReadAsync(conversationId, user.Id);

            await this.chatHub.Clients.All
                .SendAsync("MarkAsRead", conversationId);

            return this.NoContent();
        }
    }
}
