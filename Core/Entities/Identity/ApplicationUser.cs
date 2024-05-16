using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
        }

        public string DisplayName { get; set; }

        public string ProfileImageUrl { get; set; }
    }
}
