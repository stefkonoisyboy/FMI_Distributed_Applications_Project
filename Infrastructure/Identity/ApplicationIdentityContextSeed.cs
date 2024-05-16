using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class ApplicationIdentityContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<ApplicationUser> userManager)
        {
            if (userManager.Users.Any())
            {
                return;
            }

            var user1 = new ApplicationUser
            {
                DisplayName = "Bob",
                Email = "bob@test.com",
                UserName = "bob@test.com",
                PhoneNumber = "0876148608",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845883/cld-sample-3.jpg",
            };

            var user2 = new ApplicationUser
            {
                DisplayName = "John",
                Email = "john@test.com",
                UserName = "john@test.com",
                PhoneNumber = "0876148601",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845882/cld-sample.jpg",
            };

            var user3 = new ApplicationUser
            {
                DisplayName = "Diana",
                Email = "diana@test.com",
                UserName = "diana@test.com",
                PhoneNumber = "0876148602",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845869/samples/ecommerce/leather-bag-gray.jpg",
            };

            var user4 = new ApplicationUser
            {
                DisplayName = "Ben",
                Email = "ben@test.com",
                UserName = "ben@test.com",
                PhoneNumber = "0876148603",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845867/samples/people/bicycle.jpg",
            };

            var user5 = new ApplicationUser
            {
                DisplayName = "Naomi",
                Email = "naomi@test.com",
                UserName = "naomi@test.com",
                PhoneNumber = "0876148604",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845866/samples/animals/three-dogs.jpg",
            };

            var user6 = new ApplicationUser
            {
                DisplayName = "Alicia",
                Email = "alicia@test.com",
                UserName = "alicia@test.com",
                PhoneNumber = "0876148605",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845865/samples/bike.jpg",
            };

            var user7 = new ApplicationUser
            {
                DisplayName = "Kari",
                Email = "kari@test.com",
                UserName = "kari@test.com",
                PhoneNumber = "0876148606",
                ProfileImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845865/samples/bike.jpg",
            };

            await userManager.CreateAsync(user1, "Pa$$w0rd");
            await userManager.CreateAsync(user2, "Pa$$w0rd");
            await userManager.CreateAsync(user3, "Pa$$w0rd");
            await userManager.CreateAsync(user4, "Pa$$w0rd");
            await userManager.CreateAsync(user5, "Pa$$w0rd");
            await userManager.CreateAsync(user6, "Pa$$w0rd");
            await userManager.CreateAsync(user7, "Pa$$w0rd");
        }
    }
}
