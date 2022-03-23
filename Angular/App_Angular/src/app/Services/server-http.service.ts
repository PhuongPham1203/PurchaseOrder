import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ServerHttpService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json',
      // Authorization : "my-auth-token"
    })

  };

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getProfile(): Observable<any> {
    const url = `${this.REST_API_SERVER}/profile`;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }
  public getPosts(): Observable<any> {
    const url = `${this.REST_API_SERVER}/posts`;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addPosts(data): Observable<any> {
    const url = `${this.REST_API_SERVER}/posts`;
    return this.httpClient.post<any>(url, data, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('an error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` + ` body was: ${error.error}`
      );
    }

    return throwError("Somwthing bad happened; please try again later.");
  }
}
