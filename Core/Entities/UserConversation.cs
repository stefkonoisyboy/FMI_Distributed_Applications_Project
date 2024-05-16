namespace Core.Entities
{
    public class UserConversation : BaseEntity
    {
        public string UserId { get; set; }

        public int ConversationId { get; set; }

        public Conversation Conversation { get; set; }
    }
}
