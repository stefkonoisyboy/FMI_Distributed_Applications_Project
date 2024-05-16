using API.Attributes;
using API.Errors;
using API.Extensions;
using Core.Dtos;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [CustomAuthorize]
    public class ContactsController : ApiController
    {
        private readonly IContactsService contactsService;
        private readonly IUserService userService;
        private readonly UserManager<ApplicationUser> userManager;

        public ContactsController(IContactsService contactService, IUserService userService, UserManager<ApplicationUser> userManager)
        {
            this.contactsService = contactService;
            this.userService = userService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ContactInputDto inputDto)
        {

            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            string userId = user.Id;

            if (!await this.userService.FindUserByPhoneNumberAsync(inputDto.Phone))
            {
                return this.NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.USER_NOT_FOUND));
            }

            if (await this.contactsService.FindByPhoneAsync(inputDto.Phone, userId))
            {
                return this.Conflict(new ApiResponse(StatusCodes.Status409Conflict, Constants.CONTACT_ALREADY_EXISTS));
            }

            inputDto.UserId = userId;
            await this.contactsService.CreateAsync(inputDto);

            return this.CreatedAtAction(nameof(Create), "Hello");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);
            var contactsDto = await this.contactsService.GetAllAsync(user.Id);

            return this.Ok(contactsDto);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var exists = await this.contactsService.FindByIdAsync(id);
            if(!exists)
            {
                return NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.CONTACT_NOT_FOUND));
            }

            var contactDto = await this.contactsService.GetByIdAsync(id);

            return this.Ok(contactDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var exists = await this.contactsService.FindByIdAsync(id);
            if (!exists)
            {
                return NotFound(new ApiResponse(StatusCodes.Status404NotFound, Constants.CONTACT_NOT_FOUND));
            }

            await this.contactsService.DeleteAsync(id);

            return this.Ok();
        }
    }
}
