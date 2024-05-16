using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
           this IServiceCollection services,
           IConfiguration configuration)
        {
            services.AddDbContext<ApplicationIdentityContext>(opt =>
            {
                opt.UseNpgsql(configuration.GetConnectionString("IdentityConnection"));
            });

            services.AddIdentityCore<ApplicationUser>(opt =>
            {
                // add identity options here
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationIdentityContext>()
            .AddSignInManager<SignInManager<ApplicationUser>>()
            .AddDefaultTokenProviders();

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Token:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]))
                    };
                });

            services.AddAuthorization();

            return services;
        }
    }
}
