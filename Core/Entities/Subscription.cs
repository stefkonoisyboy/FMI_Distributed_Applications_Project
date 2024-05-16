using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Subscription : BaseEntity
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Endpoint { get; set; }

        [Required]
        public string P256dh { get; set; }

        [Required]
        public string Auth { get; set; }
    }
}
