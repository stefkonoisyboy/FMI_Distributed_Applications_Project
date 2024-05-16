using Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IContactsService
    {
        Task CreateAsync(ContactInputDto inputDto);

        Task<IReadOnlyList<ContactDto>> GetAllAsync(string userId);

        Task<bool> FindByIdAsync(int id);

        Task<bool> FindByPhoneAsync(string phone, string userId);

        Task<ContactDto> GetByIdAsync(int id);

        Task DeleteAsync(int id);
    }
}
