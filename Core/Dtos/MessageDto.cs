using System.Text.Json.Serialization;

namespace Core.Dtos
{
    public class MessageDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("conversationId")]
        public int ConversationId { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }

        [JsonPropertyName("senderId")]
        public string SenderId { get; set; }

        [JsonPropertyName("senderProfileImageUrl")]
        public string SenderProfileImageUrl { get; set; }

        [JsonPropertyName("senderDisplayName")]
        public string SenderDisplayName { get; set; }

        [JsonPropertyName("createdOn")]
        public string CreatedOn { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }
    }
}
