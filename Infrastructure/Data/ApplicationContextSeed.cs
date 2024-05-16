using Core.Entities;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class ApplicationContextSeed
    {
        public static async Task SeedAsync(ApplicationContext context, ApplicationIdentityContext identityContext)
        {
            if (await context.Conversations.AnyAsync() || await context.Messages.AnyAsync() || await context.UserConversations.AnyAsync())
            {
                return;
            }

            var user1 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "bob@test.com");
            var user2 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "john@test.com");
            var user3 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "diana@test.com");
            var user4 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "ben@test.com");
            var user5 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "naomi@test.com");
            var user6 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "alicia@test.com");
            var user7 = await identityContext.Users.FirstOrDefaultAsync(u => u.Email == "kari@test.com");

            var conversation1 = new Conversation {};
            var conversation2 = new Conversation {};
            var conversation3 = new Conversation {};
            var conversation4 = new Conversation {};
            var conversation5 = new Conversation {};
            var conversation6 = new Conversation {};

            await context.Conversations.AddRangeAsync(conversation1, conversation2, conversation3, conversation4, conversation5, conversation6);
            await context.SaveChangesAsync();

            var messages = new List<Message>()
            {
                new Message
                {
                    ConversationId = conversation1.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation1.Id,
                    SenderId = user2.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation2.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation2.Id,
                    SenderId = user3.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation3.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation3.Id,
                    SenderId = user4.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation4.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation4.Id,
                    SenderId = user5.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation5.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation5.Id,
                    SenderId = user6.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation6.Id,
                    SenderId = user1.Id,
                    Content = "Hi there!"
                },
                new Message
                {
                    ConversationId = conversation6.Id,
                    SenderId = user7.Id,
                    Content = "Hi there!"
                },
            };

            await context.Messages.AddRangeAsync(messages);
            await context.SaveChangesAsync();

            var userConversations = new List<UserConversation>()
            {
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation1.Id,
                },
                new UserConversation
                {
                    UserId = user2.Id,
                    ConversationId = conversation1.Id,
                },
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation2.Id,
                },
                new UserConversation
                {
                    UserId = user3.Id,
                    ConversationId = conversation2.Id,
                },
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation3.Id,
                },
                new UserConversation
                {
                    UserId = user4.Id,
                    ConversationId = conversation3.Id,
                },
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation4.Id,
                },
                new UserConversation
                {
                    UserId = user5.Id,
                    ConversationId = conversation4.Id,
                },
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation5.Id,
                },
                new UserConversation
                {
                    UserId = user6.Id,
                    ConversationId = conversation5.Id,
                },
                new UserConversation
                {
                    UserId = user1.Id,
                    ConversationId = conversation6.Id,
                },
                new UserConversation
                {
                    UserId = user7.Id,
                    ConversationId = conversation6.Id,
                },
            };

            await context.UserConversations.AddRangeAsync(userConversations);
            await context.SaveChangesAsync();

            var contacts = new List<Contact>()
            {
                new Contact
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Phone = "0876148601",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845882/cld-sample.jpg",
                    UserId = user1.Id,
                },
                new Contact
                {
                    FirstName = "Diana",
                    LastName = "Naydenova",
                    Phone = "0876148602",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845869/samples/ecommerce/leather-bag-gray.jpg",
                    UserId = user1.Id,
                },
                new Contact
                {
                    FirstName = "Ben",
                    LastName = "Shelton",
                    Phone = "0876148603",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845867/samples/people/bicycle.jpg",
                    UserId = user1.Id,
                },
                new Contact
                {
                    FirstName = "Naomi",
                    LastName = "Osaka",
                    Phone = "0876148604",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845866/samples/animals/three-dogs.jpg",
                    UserId = user1.Id,
                },
                new Contact
                {
                    FirstName = "Alicia",
                    LastName = "Top",
                    Phone = "0876148605",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845865/samples/bike.jpg",
                    UserId = user1.Id,
                },
                new Contact
                {
                    FirstName = "Kari",
                    LastName = "Markova",
                    Phone = "0876148606",
                    Address = "Address",
                    City = "City",
                    ImageUrl = "https://res.cloudinary.com/dvbopv7th/image/upload/v1682845865/samples/bike.jpg",
                    UserId = user1.Id,
                },
            };

            await context.Contacts.AddRangeAsync(contacts);
            await context.SaveChangesAsync();
        }
    }
}
