import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DomainAPIService } from '../Services/domain-api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private domainAPI: DomainAPIService,
		private httpClient: HttpClient
	) {

	}

	public dataPO = null;

	ngOnInit(): void {

		this.updateListPurchaserOrder();
		
	}


	// display List Purchase Order
	public updateListPurchaserOrder() {
		this.getListPurchaserOrder().subscribe((data) => {
			this.dataPO = data;
			
		});
		
	}

	// Get List 10 Purchase Order with Supplier
	public getListPurchaserOrder(): Observable<any> {
		var url = this.domainAPI.getUrlPO()+"/Home/GetPurchaseOrder";
		//var url = "http://localhost:3000/posts"; // test

		return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
	}

	// httpOptions
	private httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": 'application/json',
			// Authorization : "my-auth-token"
		})

	};

	// Error
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('an error occurred:', error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status},` + ` body was: ${error.error}`
			);
		}

		return throwError("Something bad happened; please try again later.");
	}


}
