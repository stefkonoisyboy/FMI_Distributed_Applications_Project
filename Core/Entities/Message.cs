using Core.Entities.Enums;

namespace Core.Entities
{
    public class Message : BaseEntity
    {
        public int ConversationId { get; set; }

        public Conversation Conversation { get; set; }

        public string SenderId { get; set; }

        public string Content { get; set; }

        public MessageStatus Status { get; set; } = MessageStatus.Unread;
    }
}
