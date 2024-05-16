using Core.Dtos;

namespace Core.Interfaces
{
    public interface IUserService
    {
        Task<bool> CheckIfUserExistsAsync(string id);

        Task<bool> FindUserByPhoneNumberAsync(string phoneNumber);

        Task<UserDto> GetByPhoneNumberAsync(string phoneNumber);

        Task<IReadOnlyList<UserDto>> GetAllAsync(string userId);
        
        Task<UserDto> UpdateUserAsync(UpdateUserDto userDto, string userId);
    }
}
