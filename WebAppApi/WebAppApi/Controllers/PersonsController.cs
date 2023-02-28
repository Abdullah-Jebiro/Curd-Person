using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppApi.Data;
using WebAppApi.Model;
using WebAppApi.Model.Dtos;
using WebAppApi.Repository;

namespace WebAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IPersonRepository _service;

        public PersonsController(IPersonRepository Service)
        {
            _service = Service;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Person>>> GetPersons()
        {        
            var Persons = await _service.GetPersonsAsync();

            if (Persons == null)
            {
                return NotFound();
            }

            return Ok(Persons);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {

            var person = await _service.GetPersonAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(PersonDto dto)
        {
            var person = new Person()
            {
                Name = dto.Name,
                Gender = dto.Gender,
                Datebirth = dto.Datebirth,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                Image=dto.Image

            };
            await _service.AddPersonAsync(person);
            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        [HttpPut]
        public async Task<IActionResult> PutPerson(Person person)
        {
           int id= person.Id;
           if(!await _service.IsvalidPerson(id))
                return BadRequest();

            await _service.UpdatePersonAsync(person);
            return NoContent();
        }    

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {

            var person = await _service.GetPersonAsync(id);
            if (person == null)
            {
                return NotFound();
            }
            await _service.DeleteAsync(person);
            return NoContent();
        }
    }
}
