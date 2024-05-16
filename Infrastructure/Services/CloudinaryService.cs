using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Core;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly IConfiguration configuration;
        private readonly CloudinarySettings cloudinarySettings;
        private readonly Cloudinary cloudinary;

        public CloudinaryService(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.cloudinarySettings = this.configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>();

            Account account = new Account(
                this.cloudinarySettings.CloudName,
                this.cloudinarySettings.ApiKey,
                this.cloudinarySettings.ApiSecret);

            this.cloudinary = new Cloudinary(account);
        }

        public string Upload(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = this.cloudinary.Upload(uploadParams);
                }
            }

            return uploadResult.SecureUrl.ToString();
        }
    }
}

