using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Infrastructure.Services
{
    public class ContactsService : IContactsService
    {
        private readonly ApplicationContext dbContext;
        private readonly IMapper mapper;
        private readonly ICloudinaryService cloudinaryService;

        public ContactsService(ApplicationContext dbContext, IMapper mapper, ICloudinaryService cloudinaryService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task CreateAsync(ContactInputDto inputDto)
        {
            var dbContact = this.mapper.Map<ContactInputDto, Contact>(inputDto);

            if(inputDto.Image != null)
            {
               dbContact.ImageUrl = this.cloudinaryService.Upload(inputDto.Image);
            }

            await this.dbContext.Contacts.AddAsync(dbContact);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var dbContent = await this.dbContext.Contacts.FirstOrDefaultAsync(c=> c.Id == id);
            this.dbContext.Contacts.Remove(dbContent);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> FindByIdAsync(int id)
        {
            return await this.dbContext.Contacts.AnyAsync((c) => c.Id == id);
        }

        public async Task<bool> FindByPhoneAsync(string phone, string userId)
        {
            return await this.dbContext.Contacts.AnyAsync(c => c.UserId == userId && c.Phone == phone);
        }

        public async Task<IReadOnlyList<ContactDto>> GetAllAsync(string userId)
        {
            var dbContacts = await this.dbContext.Contacts.Where(c => c.UserId == userId).ToListAsync();
            var contacts = this.mapper.Map<IReadOnlyList<Contact>, IReadOnlyList<ContactDto>>(dbContacts);

            return contacts;
        }

        public async Task<ContactDto> GetByIdAsync(int id)
        {
            var dbContact = await this.dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            var contact = this.mapper.Map<Contact, ContactDto>(dbContact);

            return contact;
        }
    }
}
