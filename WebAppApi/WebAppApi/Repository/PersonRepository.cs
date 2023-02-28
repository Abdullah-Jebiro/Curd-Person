using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using WebAppApi.Data;
using WebAppApi.Model;
using WebAppApi.Model.Dtos;

namespace WebAppApi.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ILogger<IPersonRepository> _logger;
        private readonly AppDbContext _context;

        public PersonRepository(ILogger<IPersonRepository> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;

        }
        public async Task<Person> AddPersonAsync(Person person)
        {
            await _context.Person.AddAsync(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task DeleteAsync(Person person)
        {
            _logger.LogWarning("Remove");
            _context.Person.Remove(person);
            await _context.SaveChangesAsync();
        }

        public async Task<Person?> GetPersonAsync(int personId)
        {
            return await _context.Person.FindAsync(personId);
        }

        public async Task<List<Person>?> GetPersonsAsync()
        {
            return await _context.Person.ToListAsync();
        }

        public async Task<bool> IsvalidPerson(int personId)
        {
           return await _context.Person.AnyAsync(p=>p.Id==personId);
        }

        public async Task PartiallyUpdatePersonAsync(JsonPatchDocument<PersonDto> dto, Person person)
        {
            var personToPatch = new PersonDto()
            {
                Name = person.Name,
                Gender = person.Gender,
                PhoneNumber = person.Gender,
                Address = person.Address,
                Image = person.Image
            };

            dto.ApplyTo(personToPatch);

            person.Name = personToPatch.Name;
            person.Gender = personToPatch.Gender;
            person.PhoneNumber = personToPatch.PhoneNumber;
            person.Image = personToPatch.Image;

            _context.Person.Update(person);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePersonAsync(Person Person)
        {
            _context.Person.Update(Person);
            await _context.SaveChangesAsync();
        }
    }
}
