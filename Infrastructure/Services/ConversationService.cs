using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class ConversationService : IConversationService
    {
        private readonly ApplicationContext dbContext;
        private readonly ApplicationIdentityContext identityContext;
        private readonly IMapper mapper;

        public ConversationService(ApplicationContext dbContext, ApplicationIdentityContext identityContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.identityContext = identityContext;
            this.mapper = mapper;
        }

        public async Task<int> CheckIfConversationWithParticipantsExistsAsync(IReadOnlyList<string> participantsIds, string userId)
        {
            var conversations = await this.dbContext.Conversations
                .Include(c => c.Users)
                .Where(c => c.Users.Any(u => u.UserId == userId))
                .ToListAsync();

            var result = -1;

            foreach (var conversation in conversations)
            {
                int counter = 0;
                var conversationUsersIds = conversation.Users.Where(u => u.UserId != userId).Select(u => u.UserId);

                foreach (var participantId in participantsIds)
                {
                    if (conversationUsersIds.Any(id => id == participantId))
                    {
                        counter++;
                    }
                }

                if (conversationUsersIds.Count() == participantsIds.Count() && counter == participantsIds.Count())
                {
                    result = conversation.Id;
                    break;
                }
            }

            return result;
        }

        public async Task<ConversationDto> CreateAsync(CreateConversationDto conversationDto, string userId)
        {
            var createdConversation = this.mapper.Map<CreateConversationDto, Conversation>(conversationDto);

            await this.dbContext.Conversations.AddAsync(createdConversation);
            await this.dbContext.SaveChangesAsync();

            foreach (var item in conversationDto.UsersIds)
            {
                UserConversation userConversation = new UserConversation
                {
                    ConversationId = createdConversation.Id,
                    UserId = item,
                };

                await this.dbContext.UserConversations.AddAsync(userConversation);
            }

            UserConversation currentUserConversation = new UserConversation
            {
                ConversationId = createdConversation.Id,
                UserId = userId,
            };

            await this.dbContext.UserConversations.AddAsync(currentUserConversation);
            await this.dbContext.SaveChangesAsync();

            var dbConversation = await this.dbContext.Conversations
               .Include(c => c.Users)
               .Include(c => c.Messages)
               .Where(c => c.Id == createdConversation.Id)
               .FirstOrDefaultAsync();

            var conversation = this.mapper.Map<Conversation, ConversationDto>(dbConversation,
                   opt => opt.AfterMap((src, dest) =>
                   {
                       var unreadMessagesCount = this.dbContext.Messages
                                                       .Count((m => m.ConversationId == dest.Id && m.SenderId != userId && m.Status == Core.Entities.Enums.MessageStatus.Unread));

                       var participants = this.identityContext.Users
                                                   .Where(u => u.Id != userId && dest.ParticipantsIds.Any(pi => pi == u.Id))
                                                   .Select(u => new
                                                   {
                                                       DisplayName = u.DisplayName,
                                                       ProfileImageUrl = u.ProfileImageUrl,
                                                   })
                                                   .ToList();

                       var firstParticipant = participants.FirstOrDefault();

                       dest.UnreadMessagesCount = unreadMessagesCount;
                       dest.Title = string.IsNullOrWhiteSpace(dest.Title) ? string.Join(", ", participants.Select(p => p.DisplayName)) : dest.Title;

                       if (firstParticipant != null)
                       {
                           dest.ImageUrl = dest.ImageUrl ?? firstParticipant.ProfileImageUrl;
                       }

                       var dbMessages = this.dbContext.Messages
                                                       .Where(m => m.ConversationId == dest.Id)
                                                       .ToList();

                       var dbLastMessage = dbMessages.OrderByDescending(m => m.CreatedOn).FirstOrDefault();

                       if (dbLastMessage != null)
                       {
                           var lastMessageDto = this.mapper.Map<Message, MessageDto>(dbLastMessage,
                                       opt => opt.AfterMap((src, dest) =>
                                       {
                                           var sender = this.identityContext.Users
                                                                            .FirstOrDefault(u => u.Id == dest.SenderId);

                                           if (sender != null)
                                           {
                                               dest.SenderProfileImageUrl = sender.ProfileImageUrl;
                                               dest.SenderDisplayName = sender.DisplayName;
                                           }
                                       }));

                           dest.LastMessage = lastMessageDto;
                       }
                   }));

            return conversation;
        }

        public async Task DeleteAsync(int conversationId)
        {
            var conversation = await this.dbContext.Conversations
                .FirstOrDefaultAsync(c => c.Id == conversationId);

            this.dbContext.Conversations.Remove(conversation);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> FindByIdAsync(int conversationId)
        {
            return await this.dbContext.Conversations
                .AnyAsync(c => c.Id == conversationId);
        }

        public async Task<IReadOnlyList<ConversationDto>> GetAllByUserIdAsync(string userId)
        {
            var dbConversations = await this.dbContext.Conversations
                .Include(c => c.Users)
                .Include(c => c.Messages)
                .Where(c => c.Users.Any(uc => uc.UserId == userId) && c.Messages.Count() > 0)
                .OrderByDescending(c => c.Messages.OrderByDescending(m => m.CreatedOn).FirstOrDefault().CreatedOn)
                .ToListAsync();

            var conversations = this.mapper.Map<IReadOnlyList<Conversation>, IReadOnlyList<ConversationDto>>(dbConversations,
                    opt => opt.AfterMap((src, dest) =>
                    {
                        foreach (var item in dest)
                        {
                            var unreadMessagesCount = this.dbContext.Messages
                                                        .Count((m => m.ConversationId == item.Id && m.SenderId != userId && m.Status == Core.Entities.Enums.MessageStatus.Unread));

                            var participants = this.identityContext.Users
                                                        .Where(u => u.Id != userId && item.ParticipantsIds.Any(pi => pi == u.Id))
                                                        .Select(u => new
                                                        {
                                                            DisplayName = u.DisplayName,
                                                            ProfileImageUrl = u.ProfileImageUrl,
                                                        })
                                                       .ToList();

                            var firstParticipant = participants.FirstOrDefault();

                            item.UnreadMessagesCount = unreadMessagesCount;
                            item.Title = string.IsNullOrWhiteSpace(item.Title) ? string.Join(", ", participants.Select(p => p.DisplayName)) : item.Title;

                            if (firstParticipant != null)
                            {
                                item.ImageUrl = item.ImageUrl ?? firstParticipant.ProfileImageUrl;
                            }

                            var dbMessages = this.dbContext.Messages
                                                        .Where(m => m.ConversationId == item.Id)
                                                        .ToList();

                            var dbLastMessage = dbMessages.OrderByDescending(m => m.CreatedOn).FirstOrDefault();

                            if (dbLastMessage != null)
                            {
                                var lastMessageDto = this.mapper.Map<Message, MessageDto>(dbLastMessage,
                                            opt => opt.AfterMap((src, dest) =>
                                            {
                                                var sender = this.identityContext.Users
                                                                                 .FirstOrDefault(u => u.Id == dest.SenderId);

                                                if (sender != null)
                                                {
                                                    dest.SenderProfileImageUrl = sender.ProfileImageUrl;
                                                    dest.SenderDisplayName = sender.DisplayName;
                                                }
                                            }));

                                item.LastMessage = lastMessageDto;
                            }
                        }
                    }));

            return conversations;
        }

        public async Task<ConversationDto> GetByIdAsync(int conversationId, string userId)
        {
            var dbConversation = await this.dbContext.Conversations
               .Include(c => c.Users)
               .Include(c => c.Messages)
               .Where(c => c.Id == conversationId)
               .FirstOrDefaultAsync();

            var conversation = this.mapper.Map<Conversation, ConversationDto>(dbConversation,
                   opt => opt.AfterMap((src, dest) =>
                   {
                       var unreadMessagesCount = this.dbContext.Messages
                                                       .Count((m => m.ConversationId == dest.Id && m.SenderId != userId && m.Status == Core.Entities.Enums.MessageStatus.Unread));

                       var participants = this.identityContext.Users
                                                   .Where(u => u.Id != userId && dest.ParticipantsIds.Any(pi => pi == u.Id))
                                                   .Select(u => new
                                                   {
                                                       DisplayName = u.DisplayName,
                                                       ProfileImageUrl = u.ProfileImageUrl,
                                                   })
                                                   .ToList();

                       var firstParticipant = participants.FirstOrDefault();

                       dest.UnreadMessagesCount = unreadMessagesCount;
                       dest.Title = string.IsNullOrWhiteSpace(dest.Title) ? string.Join(", ", participants.Select(p => p.DisplayName)) : dest.Title;

                       if (firstParticipant != null)
                       {
                           dest.ImageUrl = dest.ImageUrl ?? firstParticipant.ProfileImageUrl;
                       }

                       var dbMessages = this.dbContext.Messages
                                                       .Where(m => m.ConversationId == dest.Id)
                                                       .ToList();

                       var dbLastMessage = dbMessages.OrderByDescending(m => m.CreatedOn).FirstOrDefault();

                       if (dbLastMessage != null)
                       {
                           var lastMessageDto = this.mapper.Map<Message, MessageDto>(dbLastMessage,
                                       opt => opt.AfterMap((src, dest) =>
                                       {
                                           var sender = this.identityContext.Users
                                                                            .FirstOrDefault(u => u.Id == dest.SenderId);

                                           if (sender != null)
                                           {
                                               dest.SenderProfileImageUrl = sender.ProfileImageUrl;
                                               dest.SenderDisplayName = sender.DisplayName;
                                           }
                                       }));

                           dest.LastMessage = lastMessageDto;
                       }
                   }));

            return conversation;
        }
    }
}
