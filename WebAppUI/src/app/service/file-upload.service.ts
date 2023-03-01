import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File){

    const formData = new FormData();

    formData.append('file', file);

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>('https://localhost:7299/api/File/UploadFile',
      formData, { headers }).pipe(
        map(res=>res.imageName),
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