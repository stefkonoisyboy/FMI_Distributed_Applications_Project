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
    public class AccountController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IUserService userService;

        public AccountController(
           UserManager<ApplicationUser> userManager,
           SignInManager<ApplicationUser> signInManager,
           ITokenService tokenService,
           IUserService userService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.userService = userService;
        }

        [HttpGet]
        [CustomAuthorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

            return this.Ok(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = this.tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                PhoneNumber = user.PhoneNumber,
                ProfileImageUrl = user.ProfileImageUrl,
            });
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync(
            [FromQuery] string email)
        {
            return this.Ok(await this.userManager
                .FindByEmailAsync(email) != null);
        }

        [HttpPatch]
        [CustomAuthorize]
        public async Task<ActionResult<UserDto>> UpdateAsync([FromForm] UpdateUserDto updateUserDto) {
            var user = await this.userManager
                .FindByEmailFromClaimsPrincipalAsync(this.User);

           var dto = await this.userService.UpdateUserAsync(updateUserDto, user.Id);

            return this.Ok(dto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.userManager
                .FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return this.Unauthorized(new ApiResponse(StatusCodes.Status401Unauthorized));
            }

            var result = await this.signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return this.Unauthorized(new ApiResponse(StatusCodes.Status401Unauthorized));
            }

            return this.Ok(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = this.tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                PhoneNumber = user.PhoneNumber,
                ProfileImageUrl = user.ProfileImageUrl,
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await this.userManager
                .FindByEmailAsync(registerDto.Email) != null)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] { "Email address is already in use" }
                });
            }

            if (await this.userService.FindUserByPhoneNumberAsync(registerDto.PhoneNumber))
            {
                return this.Conflict(new ApiResponse(StatusCodes.Status409Conflict, Constants.USER_ALREADY_EXISTS));
            }

            var user = new ApplicationUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
            };

            var result = await this.userManager
                .CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return this.BadRequest(new ApiResponse(StatusCodes.Status400BadRequest));
            }

            return this.Ok(new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                ProfileImageUrl = user.ProfileImageUrl,
                Token = this.tokenService.CreateToken(user),
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            });
        }
    }
}
