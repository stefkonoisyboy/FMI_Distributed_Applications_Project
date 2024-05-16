namespace Core.Dtos
{
    public class ConversationDto
    {
        public int Id { get; set; }

        public string ImageUrl { get; set; }

        public string Title { get; set; }

        public int UnreadMessagesCount { get; set; }

        public MessageDto LastMessage { get; set; }

        public IReadOnlyList<string> ParticipantsIds { get; set; }
    }
}
