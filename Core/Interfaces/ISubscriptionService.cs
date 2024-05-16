using Core.Dtos;

namespace Core.Interfaces
{
    public interface ISubscriptionService
    {
        Task<SubscriptionDto> CreateAsync(CreateSubscriptionDto subscriptionDto);

        Task DeleteAsync(string userId);

        Task<bool> FindByUserIdAndEndpointAsync(string userId, string endpoint);

        Task SendNotificationsAsync(NotificationDto notificationDto);

        Task<IReadOnlyList<SubscriptionDto>> GetAllAsync();
    }
}
