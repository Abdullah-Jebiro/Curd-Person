import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/service/person.service';
import { IPersonForCreate } from '../models/IPersonForCreate';
import { IPerson } from '../models/Person';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  constructor(private personService: PersonService) {
  }
  Persons$ = this.personService.getPersons;

  Create() {
    let Persons:IPersonForCreate = {"name":"Abdullah Jbero","datebirth":"2000-02-28","gender":"Male","address":"Turkey","phoneNumber":"+84374267429","image":"2.jpg"};
    this.personService.setPerson(Persons);

  }

  Delete(Id: number) {
    this.personService.deletePerson(Id);
    console.log(Id);
  }
}
