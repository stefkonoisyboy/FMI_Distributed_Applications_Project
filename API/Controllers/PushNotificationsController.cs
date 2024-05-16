using API.Attributes;
using API.Errors;
using Core.Dtos;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [CustomAuthorize]
    public class PushNotificationsController : ApiController
    {
        private readonly ISubscriptionService subscriptionService;
        private readonly IUserService userService;

        public PushNotificationsController(ISubscriptionService subscriptionService, IUserService userService)
        {
            this.subscriptionService = subscriptionService;
            this.userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SubscriptionDto>>> GetAll()
        {
            var response = await this.subscriptionService
                .GetAllAsync();

            return this.Ok(response);
        }

        [HttpPost("subscribe")]
        public async Task<ActionResult<SubscriptionDto>> Subscribe([FromBody] CreateSubscriptionDto subscriptionDto)
        {
            if (!await this.userService.CheckIfUserExistsAsync(subscriptionDto.UserId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
            }

            if (await this.subscriptionService.FindByUserIdAndEndpointAsync(subscriptionDto.UserId, subscriptionDto.Endpoint))
            {
                return this.Conflict(new ApiResponse(StatusCodes.Status409Conflict, Constants.SUBSCRIPTION_EXISTS));
            }

            var response = await this.subscriptionService
                .CreateAsync(subscriptionDto);

            if (response == null)
            {
                return this.BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, Constants.SUBSCRIPTION_NOT_CREATED));
            }

            return this.CreatedAtAction(nameof(this.Subscribe), response);
        }

        [HttpPost("send")]
        public async Task<ActionResult> Send([FromBody] NotificationDto notificationDto)
        {
            if (!await this.userService.CheckIfUserExistsAsync(notificationDto.UserId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
            }

            await this.subscriptionService.SendNotificationsAsync(notificationDto);
            return this.NoContent();
        }

        [HttpDelete("unsubscribe/{userId}")]
        public async Task<ActionResult> Delete([FromQuery] string userId)
        {
            if (!await this.userService.CheckIfUserExistsAsync(userId))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
            }

            await this.subscriptionService.DeleteAsync(userId);
            return this.NoContent();
        }
    }
}
