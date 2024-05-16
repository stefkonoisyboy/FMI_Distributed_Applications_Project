using Core.Dtos;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IMessageService
    {
        Task<MessageDto> CreateAsync(CreateMessageDto messageDto);

        Task MarkAsReadAsync(int conversationId, string userId);

        Task<IReadOnlyList<MessageDto>> GetAllByConversationIdAsync(int conversationId);
    }
}
