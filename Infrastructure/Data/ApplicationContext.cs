using Core.Entities;
using Core.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }


        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Conversation> Conversations { get; set; }

        public DbSet<UserConversation> UserConversations { get; set; }

        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
