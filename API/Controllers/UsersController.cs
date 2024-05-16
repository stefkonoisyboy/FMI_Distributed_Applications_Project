using API.Attributes;
using API.Errors;
using API.Extensions;
using Core.Dtos;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [CustomAuthorize]
    public class UsersController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IUserService userService;

        public UsersController(UserManager<ApplicationUser> userManager, IUserService userService)
        {
            this.userManager = userManager;
            this.userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<UserDto>>> All()
        {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            var response = await this.userService
                .GetAllAsync(user.Id);

            return this.Ok(response);
        }

        [HttpGet("by-phone/{phoneNumber}")]
        public async Task<ActionResult<UserDto>> ByPhoneNumber([FromRoute] string phoneNumber)
        {
            if (!await this.userService.FindUserByPhoneNumberAsync(phoneNumber))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
            }

            var response = await this.userService
                .GetByPhoneNumberAsync(phoneNumber);

            return this.Ok(response);
        }
    }
}
