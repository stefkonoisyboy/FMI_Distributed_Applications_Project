namespace Core.Dtos
{
    public class CreateConversationDto
    {
        public string Title { get; set; }

        public string[] UsersIds { get; set; }
    }
}
