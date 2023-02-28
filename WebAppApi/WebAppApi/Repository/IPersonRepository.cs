using Microsoft.AspNetCore.JsonPatch;
using WebAppApi.Model;
using WebAppApi.Model.Dtos;

namespace WebAppApi.Repository
{
    public interface IPersonRepository
    {
        Task<bool> IsvalidPerson(int personId);
        Task<List<Person>?> GetPersonsAsync();
        Task<Person?> GetPersonAsync(int personId);
        Task<Person> AddPersonAsync(Person person);
        Task PartiallyUpdatePersonAsync(JsonPatchDocument<PersonDto> dto, Person person);
        Task UpdatePersonAsync(Person Person);
        Task DeleteAsync(Person Person);
    }
}
