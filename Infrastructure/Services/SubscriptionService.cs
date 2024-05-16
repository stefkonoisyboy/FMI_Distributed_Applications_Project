using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WebPush;

namespace Infrastructure.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly string publicVapidKey = "BDZJSiMXSJUhryPkjFh_H84ZeEjVNfq5STCXVDEW4bpXye1mybGCjufRFIVmMxJN1wHOGUunGyBra0qvSa0fGJ8";
        private readonly string privateVapidKey = "upQsMoPu4_T6aT3a8Nwg8b7Cd3wNjQwfD5PgCYJjTmc";

        private readonly ApplicationContext dbContext;
        private readonly IMapper mapper;

        public SubscriptionService(ApplicationContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<SubscriptionDto> CreateAsync(CreateSubscriptionDto subscriptionDto)
        {
            Subscription subscription = this.mapper.Map<CreateSubscriptionDto, Subscription>(subscriptionDto);

            await this.dbContext.Subscriptions.AddAsync(subscription);
            await this.dbContext.SaveChangesAsync();

            var result = this.mapper.Map<Subscription, SubscriptionDto>(subscription);

            return result;
        }

        public async Task DeleteAsync(string userId)
        {
            var subscriptions = await this.dbContext.Subscriptions
                .Where(s => s.UserId == userId)
                .ToListAsync();

            foreach (var subscription in subscriptions)
            {
                this.dbContext.Subscriptions.Remove(subscription);
            }

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> FindByUserIdAndEndpointAsync(string userId, string endpoint)
        {
            return await this.dbContext.Subscriptions
                .AnyAsync(s => s.UserId == userId && s.Endpoint == endpoint);
        }

        public async Task<IReadOnlyList<SubscriptionDto>> GetAllAsync()
        {
            var dbSubscriptions = await this.dbContext.Subscriptions
                .ToListAsync();

            var subscriptions = this.mapper.Map<IReadOnlyList<Subscription>, IReadOnlyList<SubscriptionDto>>(dbSubscriptions);

            return subscriptions;
        }

        public async Task SendNotificationsAsync(NotificationDto notificationDto)
        {
            var subscriptions = await this.dbContext.Subscriptions
                .Where(s => s.UserId == notificationDto.UserId)
                .ToListAsync();

            foreach (var subscription in subscriptions)
            {
                var subject = @"mailto:example@example.com";

                var subscriptionToBePushed = new PushSubscription(subscription.Endpoint, subscription.P256dh, subscription.Auth);
                var vapidDetails = new VapidDetails(subject, this.publicVapidKey, this.privateVapidKey);

                var webPushClient = new WebPushClient();

                PayloadDto payloadDto = new PayloadDto
                {
                    Title = notificationDto.Title,
                    Message = notificationDto.Message,
                };

                string payload = JsonSerializer.Serialize(payloadDto);

                try
                {
                    await webPushClient.SendNotificationAsync(subscriptionToBePushed, payload, vapidDetails);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message ?? ex.InnerException?.Message);
                }
            }
        }
    }
}
