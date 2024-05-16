using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<ApplicationUser> FindUserByClaimsPrincipalWithAddressAsync(
            this UserManager<ApplicationUser> userManager,
            ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await userManager.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public static async Task<ApplicationUser> FindByEmailFromClaimsPrincipalAsync(
            this UserManager<ApplicationUser> userManager,
            ClaimsPrincipal user)
        {
            return await userManager.Users
                .FirstOrDefaultAsync(u => u.Email == user.FindFirstValue(ClaimTypes.Email));
        }
    }
}
