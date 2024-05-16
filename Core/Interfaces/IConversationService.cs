using Core.Dtos;

namespace Core.Interfaces
{
    public interface IConversationService
    {
        Task<ConversationDto> CreateAsync(CreateConversationDto conversationDto, string userId);

        Task DeleteAsync(int conversationId);

        Task<bool> FindByIdAsync(int conversationId);

        Task<int> CheckIfConversationWithParticipantsExistsAsync(IReadOnlyList<string> participantsIds, string userId);

        Task<ConversationDto> GetByIdAsync(int conversationId, string userId);

        Task<IReadOnlyList<ConversationDto>> GetAllByUserIdAsync(string userId);
    }
}
