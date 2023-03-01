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
        this.fileName = date.image;
        this.updatePersonForm.patchValue({
          name: date.name,
          datebirth: date.datebirth.split('T')[0],
          address: date.address,
          phoneNumber: date.phoneNumber,
          gender: date.gender,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.updatePersonForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      datebirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      image: [''],
    });
  }

  onFileChange(event: any) {

    const file = event.target.files[0]; // get the uploaded file object
    this.fileUploadService.uploadFile(file).subscribe(
      (res) => this.fileName = res)
  }

  onSubmit(): void {
    //This function only works when the from is valid
    let person: IPerson = this.updatePersonForm.value;
    person.id = this.id;
    person.image = this.fileName;
    console.log(person);

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
