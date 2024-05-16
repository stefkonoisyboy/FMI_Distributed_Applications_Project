using AutoMapper;
using Core.Dtos;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationIdentityContext identityDbContext;
        private readonly IMapper mapper;
        private readonly ITokenService tokenService;
        private readonly ICloudinaryService cloudinaryService;

        public UserService(ApplicationIdentityContext identityDbContext, IMapper mapper, ITokenService tokenService, ICloudinaryService cloudinaryService)
        {
            this.identityDbContext = identityDbContext;
            this.mapper = mapper;
            this.tokenService = tokenService;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<bool> CheckIfUserExistsAsync(string id)
        {
            var userExists = await this.identityDbContext.Users
                .AnyAsync(u => u.Id == id);

            return userExists;
        }

        public async Task<bool> FindUserByPhoneNumberAsync(string phoneNumber)
        {
            var userExists = await this.identityDbContext.Users
                .AnyAsync(u => u.PhoneNumber == phoneNumber);

            return userExists;
        }

        public async Task<IReadOnlyList<UserDto>> GetAllAsync(string userId)
        {
            var dbUsers = await this.identityDbContext.Users
                .Where(u => u.Id != userId)
                .ToListAsync();

            var users = this.mapper.Map<IReadOnlyList<ApplicationUser>, IReadOnlyList<UserDto>>(dbUsers);

            return users;
        }

        public async Task<UserDto> GetByPhoneNumberAsync(string phoneNumber)
        {
            var dbUser = await this.identityDbContext.Users
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);

            var user = this.mapper.Map<ApplicationUser, UserDto>(dbUser);

            return user;
        }

        public async Task<UserDto> UpdateUserAsync(UpdateUserDto userDto, string userId)
        {
            ApplicationUser user = await this.identityDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            user.DisplayName = userDto.DisplayName;
            user.PhoneNumber = userDto.PhoneNumber;
            if(userDto.Image != null)
            {
                user.ProfileImageUrl = this.cloudinaryService.Upload(userDto.Image);
            }

            await this.identityDbContext.SaveChangesAsync();

            UserDto dto = new UserDto()
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = this.tokenService.CreateToken(user),
                PhoneNumber = user.PhoneNumber,
                ProfileImageUrl = user.ProfileImageUrl,
            };

            return dto;
        }
    }
}
