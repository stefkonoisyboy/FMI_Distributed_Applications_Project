using System.Text.Json.Serialization;

namespace Core.Dtos
{
    public class PayloadDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
