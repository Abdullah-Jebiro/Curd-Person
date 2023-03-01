import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IPersonForCreate } from '../person/models/IPersonForCreate';
import { IPerson } from '../person/models/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) { }

  URL = 'https://localhost:7299/api/Persons'

  setPerson(person: any): Observable<any> {
    console.log(person);
    return this.http.post<any>(this.URL, person).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.URL).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPerson(personId: Number): Observable<IPerson> {
    return this.http.get<IPerson>(this.URL + '/' + personId).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePerson(id: number): Observable<unknown> {
    const url = `${this.URL}/${id}`
    return this.http.delete(url)
      .pipe(
        tap(x => console.log(JSON.stringify(x))),
        catchError(this.handleError)
      );
  }
  updatePerson( person: IPerson): Observable<any> {
    return this.http.put<IPerson>(this.URL, person)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

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
