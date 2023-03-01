import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
import { IPersonForCreate } from '../../models/IPersonForCreate';
import { IPerson } from '../../models/Person';
;


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService) {
  }
  Persons$!: IPerson[];

  ngOnInit(): void {
    this.personService.getPersons().subscribe({
      next: (data) => {
        this.Persons$ = data;
      },
    });

  }



  Delete(Id: number) {
    this.personService.deletePerson(Id).subscribe();
    this.Persons$.splice(this.Persons$.findIndex((u) => u.id == Id), 1);
  }
}
