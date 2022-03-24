import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private domainAPI: DomainAPIService,
		private serverHttp: ServerHttpService,
		public datetimeFormat : DatetimeService
	) {

	}

	public dataPO = null;

	ngOnInit(): void {

		this.updateListPurchaserOrder();

	}


	// display List Purchase Order
	public updateListPurchaserOrder() {
		var url = this.domainAPI.getUrlPO() + "/PurchaseOrder/GetListPurchaseOrder";
		//var url = "http://localhost:3000/posts";
		this.serverHttp.getAPI(url).subscribe((data) => {
			//console.log(data);
			this.dataPO = data;
		})
	}

	
	

}
