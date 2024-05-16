namespace Core.Dtos
{
    public class CreateMessageDto
    {
        public int ConversationId { get; set; }

        public string SenderId { get; set; }

        public string Content { get; set; }
    }
}
