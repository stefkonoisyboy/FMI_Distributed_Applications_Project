using API.Attributes;
using API.Errors;
using API.Extensions;
using Core.Dtos;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [CustomAuthorize]
    public class ConversationsController : ApiController
    {
        private readonly IConversationService conversationService;
        private readonly IUserService userService;
        private readonly UserManager<ApplicationUser> userManager;

        public ConversationsController(IConversationService conversationService, IUserService userService, UserManager<ApplicationUser> userManager)
        {
            this.conversationService = conversationService;
            this.userService = userService;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ConversationDto>>> AllByCurrentUser()
        {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            var response = await this.conversationService
                .GetAllByUserIdAsync(user.Id);

            return this.Ok(response);
        }

        [HttpGet("{conversationId}")]
        public async Task<ActionResult<ConversationDto>> ById([FromRoute] int conversationId)
        {
            if (!await this.conversationService.FindByIdAsync(conversationId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status400BadRequest, Constants.CONVERSATION_NOT_FOUND));
            }

            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            var response = await this.conversationService
                .GetByIdAsync(conversationId, user.Id);

            return this.Ok(response);
        }

        [HttpPost("exists")]
        public async Task<ActionResult<int>> Exists([FromBody] IReadOnlyList<string> participantsIds)
        {
            foreach (var participantId in participantsIds)
            {
                if (!await this.userService.CheckIfUserExistsAsync(participantId))
                {
                    return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
                }
            }

            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            var response = await this.conversationService
                .CheckIfConversationWithParticipantsExistsAsync(participantsIds, user.Id);

            return this.Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ConversationDto>> Create([FromBody] CreateConversationDto conversationDto)
        {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            foreach (var participantId in conversationDto.UsersIds)
            {
                if (!await this.userService.CheckIfUserExistsAsync(participantId))
                {
                    return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
                }
            }

            if (await this.conversationService.CheckIfConversationWithParticipantsExistsAsync(conversationDto.UsersIds, user.Id) > 0)
            {
                return this.Conflict(new ApiResponse(StatusCodes.Status409Conflict, Constants.CONVERSATION_WITH_PARTICIPANTS_EXISTS));
            }

            var response = await this.conversationService
                .CreateAsync(conversationDto, user.Id);

            if (response == null)
            {
                return this.BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, Constants.CONVERSATION_NOT_CREATED));
            }

            return this.Ok(response);
        }

        [HttpDelete("{conversationId}")]
        public async Task<ActionResult> Delete([FromRoute] int conversationId)
        {
            if (!await this.conversationService.FindByIdAsync(conversationId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status400BadRequest, Constants.CONVERSATION_NOT_FOUND));
            }

            await this.conversationService
                .DeleteAsync(conversationId);

            return this.NoContent();
        }
    }
}
