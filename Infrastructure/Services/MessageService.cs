using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationContext dbContext;
        private readonly ApplicationIdentityContext identityDbContext;
        private readonly IMapper mapper;
        private readonly ISubscriptionService subscriptionService;

        public MessageService(
            ApplicationContext dbContext,
            ApplicationIdentityContext identityDbContext,
            IMapper mapper,
            ISubscriptionService subscriptionService)
        {
            this.dbContext = dbContext;
            this.identityDbContext = identityDbContext;
            this.mapper = mapper;
            this.subscriptionService = subscriptionService;
        }

        public async Task<MessageDto> CreateAsync(CreateMessageDto messageDto)
        {
            var message = this.mapper.Map<CreateMessageDto, Message>(messageDto);

            await this.dbContext.Messages.AddAsync(message);
            await this.dbContext.SaveChangesAsync();

            var result = this.mapper.Map<Message, MessageDto>(message,
                    opt => opt.AfterMap((src, dest) =>
                    {
                        var sender = this.identityDbContext.Users
                                                         .FirstOrDefault(u => u.Id == dest.SenderId);

                        if (sender != null)
                        {
                            dest.SenderProfileImageUrl = sender.ProfileImageUrl;
                            dest.SenderDisplayName = sender.DisplayName;
                        }
                    }));

            var userConversations = await this.dbContext.UserConversations
                .Include(c => c.Conversation)
                .Where(uc => uc.ConversationId == messageDto.ConversationId && uc.UserId != messageDto.SenderId)
                .ToListAsync();

            var conversation = await this.dbContext.Conversations
                .Include(uc => uc.Users)
                .Where(c => c.Id == messageDto.ConversationId)
                .FirstOrDefaultAsync();

            var participantsIds = conversation.Users
                .Select(u => u.UserId);


            foreach (var userConversation in userConversations)
            {
                var participants = await this.identityDbContext.Users
                                                        .Where(u => u.Id != userConversation.UserId && participantsIds.Any(pi => pi == u.Id))
                                                        .Select(u => new
                                                        {
                                                            DisplayName = u.DisplayName,
                                                            ProfileImageUrl = u.ProfileImageUrl,
                                                        })
                                                       .ToListAsync();

                var conversationTitle = string.IsNullOrWhiteSpace(conversation.Title) ? string.Join(", ", participants.Select(p => p.DisplayName)) : conversation.Title;

                NotificationDto notificationDto = new NotificationDto
                {
                    Title = conversationTitle,
                    Message = messageDto.Content,
                    UserId = userConversation.UserId,
                };

                await this.subscriptionService
                    .SendNotificationsAsync(notificationDto);
            }

            return result;
        }

        public async Task<IReadOnlyList<MessageDto>> GetAllByConversationIdAsync(int conversationId)
        {
            var dbMessages = await this.dbContext.Messages
                .Include(m => m.Conversation)
                .ThenInclude(c => c.Users)
                .Where(m => m.ConversationId == conversationId)
                .OrderBy(m => m.CreatedOn)
                .ToListAsync();

            var messages = this.mapper.Map<IReadOnlyList<Message>, IReadOnlyList<MessageDto>>(dbMessages,
                    opt => opt.AfterMap((src, dest) =>
                    {
                        foreach (var item in dest)
                        {
                            var sender = this.identityDbContext.Users
                                                          .FirstOrDefault(u => u.Id == item.SenderId);

                            if (sender != null)
                            {
                                item.SenderProfileImageUrl = sender.ProfileImageUrl;
                                item.SenderDisplayName = sender.DisplayName;
                            }
                        }
                    }));

            return messages;
        }

        public async Task MarkAsReadAsync(int conversationId, string userId)
        {
            var messages = await this.dbContext.Messages
                .Where(m => m.ConversationId == conversationId && m.SenderId != userId && m.Status == Core.Entities.Enums.MessageStatus.Unread)
                .ToListAsync();

            foreach (var message in messages)
            {
                message.Status = Core.Entities.Enums.MessageStatus.Read;
            }

            await this.dbContext.SaveChangesAsync();
        }
    }
}
