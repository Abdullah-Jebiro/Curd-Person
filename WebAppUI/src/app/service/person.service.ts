import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IPersonForCreate } from '../person/models/IPersonForCreate';
import { IPerson } from '../person/models/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  URL='https://localhost:7299/api/Persons'

  setPerson(person: any): Observable<any> {
    console.log(person);
    return this.http.post<any>(this.URL, person).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPersons = this.http.get<IPerson[]>(this.URL).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );

  // getperson(personId: Number): Observable<Iperson> {
  //   return this.http.get<IpersonWithSupport>(this.personUrl + personId).pipe(
  //     map((u) => u.data),
  //     tap((data) => console.log(JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  deletePerson(personId: Number): Observable<any> {
    return this.http.delete('https://localhost:7299/api/Persons/10').pipe(catchError(this.handleError));
  }

  // updateperson(
  //   person: IpersonForUpdateRequest,
  //   personId: Number
  // ): Observable<IpersonForUpdateResponse> {
  //   return this.http
  //     .put<IpersonForUpdateResponse>(this.personsUrl + '/' + personId, person)
  //     .pipe(
  //       tap((data) => console.log(JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = ` client-side error` + error.error.message;
    } else {
      // server-side error
      errorMessage = `server-side error ${error.status} Message:${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
