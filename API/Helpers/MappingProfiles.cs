using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Entities.Identity;
using System.Globalization;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            this.CreateMap<Message, MessageDto>()
                .ForMember(dto => dto.CreatedOn, opt => opt.MapFrom(m => m.CreatedOn.ToString("hh:mm tt", CultureInfo.InvariantCulture)));

            this.CreateMap<ContactInputDto, Contact>();
            this.CreateMap<Contact, ContactDto>();
            
            this.CreateMap<Conversation, ConversationDto>()
                .ForMember(dto => dto.ParticipantsIds, opt => opt.MapFrom(c => c.Users.Select(u => u.UserId)));

            this.CreateMap<CreateConversationDto, Conversation>();

            this.CreateMap<CreateMessageDto, Message>();

            this.CreateMap<CreateSubscriptionDto, Subscription>();
            this.CreateMap<Subscription, SubscriptionDto>();

            this.CreateMap<ApplicationUser, UserDto>();
        }
    }
}
