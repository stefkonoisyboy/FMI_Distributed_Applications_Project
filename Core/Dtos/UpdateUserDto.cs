using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class UpdateUserDto
    {
        public string DisplayName { get; set; }

        public string PhoneNumber { get; set; }

        public IFormFile Image { get; set; }
    }
}
