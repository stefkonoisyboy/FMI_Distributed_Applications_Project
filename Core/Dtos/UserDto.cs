using System.Text.Json.Serialization;

namespace Core.Dtos
{
    public class UserDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }

        [JsonPropertyName("profileImageUrl")]
        public string ProfileImageUrl { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName("token")]
        public string Token { get; set; }
    }
}
