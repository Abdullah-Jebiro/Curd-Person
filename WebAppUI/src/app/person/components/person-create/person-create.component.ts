import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { PersonService } from 'src/app/service/person.service';
import { SubSink } from 'subsink';
import { IPersonForCreate } from '../../models/IPersonForCreate';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css'],
})
export class PersonCreateComponent {
  createPersonForm!: FormGroup;
  fileName: any;
  private subs = new SubSink();

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.createPersonForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      datebirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onFileChange(event: any) {

    const file = event.target.files[0]; // get the uploaded file object
    this.fileUploadService.uploadFile(file).subscribe(
      (res) => this.fileName = res)
  }

  onSubmit(): void {
    //This function only works when the from is valid
    let Person: IPersonForCreate = this.createPersonForm.value;
    Person.image = this.fileName;
    console.log(this.fileName);
    console.table(Person);
    this.subs.sink = this.service.setPerson(Person).subscribe();
    this.createPersonForm.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
