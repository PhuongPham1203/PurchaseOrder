import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DomainAPIService } from './domain-api.service';
declare var $: any;

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


	constructor(
		private domainAPI: DomainAPIService,
		private httpClient: HttpClient
	) { }

	// Send Get API without data
	public getAPI(api_url): Observable<any> {
		return this.httpClient.get<any>(api_url, this.httpOptions).pipe(catchError(this.handleError));
	}

	/*
	// Send Get API with data
	public getAPIWithData(api_url, data): Observable<any> {
		return this.httpClient.get<any>(api_url, this.httpOptions).pipe(catchError(this.handleError));
	}
	*/

	// Send Post API with data
	public postAPIWithData(api_url, data): Observable<any> {
		return this.httpClient.post<any>(api_url, data).pipe(catchError(this.handleError));
		
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
