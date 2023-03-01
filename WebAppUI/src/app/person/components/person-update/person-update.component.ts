import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { PersonService } from 'src/app/service/person.service';
import { SubSink } from 'subsink';
import { IPerson } from '../../models/Person';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent {
  updatePersonForm!: FormGroup;
  private subs = new SubSink();
  fileName: any;
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private service: PersonService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.subs.sink = this.service.getPerson(this.id).subscribe({
      next: (date) => {
        this.updatePersonForm.patchValue({
          name: date.name,
          datebirth: '2000-01-02',
          address: date.address,
          phoneNumber: date.phoneNumber,
          gender: date.gender

        });
      },
      //If there is an error in the user number or an error occurs, an alert will appear with a message explaining the error
      error: (err) => {
        console.log(err);
      },
    });

    this.updatePersonForm = this.fb.group({
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
    this.fileName = file.name;
    this.fileUploadService.uploadFile(file)
      .subscribe(); // call the service to upload the file
  }

  onSubmit(): void {
    //This function only works when the from is valid
    let person: IPerson = this.updatePersonForm.value;
    person.id=this.id;
    this.subs.sink = this.service.updatePerson(person).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['./Person']);
      },
      error: (err) => {
        console.log(err);

      },
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
