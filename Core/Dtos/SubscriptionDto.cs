﻿
namespace Core.Dtos
{
    public class SubscriptionDto
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string Endpoint { get; set; }

        public string P256dh { get; set; }

        public string Auth { get; set; }
    }
}
