namespace Core.Entities
{
    public class Conversation : BaseEntity
    {
        public Conversation()
        {
            this.Messages = new HashSet<Message>();
            this.Users = new HashSet<UserConversation>();
        }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Message> Messages { get; set; }

        public ICollection<UserConversation> Users { get; set; }
    }
}
