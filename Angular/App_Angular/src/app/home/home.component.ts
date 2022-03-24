import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
		private serverHttp: ServerHttpService
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

	public string2DatetimeFormat(stringDate) {

		var d = new Date(stringDate);

		var dateString =
			("0" + d.getDate()).slice(-2) + "/" +
			("0" + (d.getMonth() + 1)).slice(-2) + "/" +
			d.getFullYear() + " " +
			("0" + d.getHours()).slice(-2) + ":" +
			("0" + d.getMinutes()).slice(-2) + ":" +
			("0" + d.getSeconds()).slice(-2);

		return dateString;
	}

	public string2DateFormat(stringDate) {

		var d = new Date(stringDate);
		var dateString =
			("0" + d.getDate()).slice(-2) + "-" +
			("0" + (d.getMonth() + 1)).slice(-2) + "-" +
			d.getFullYear();

		return dateString;
	}

	public timestamp2Datetime(timestamp) {
		var str = timestamp.replace(/\D/g, "");
		var d = new Date(parseInt(str));
	
		var dateString =
			("0" + d.getDate()).slice(-2) + "/" +
			("0" + (d.getMonth() + 1)).slice(-2) + "/" +
			d.getFullYear() + " " +
			("0" + d.getHours()).slice(-2) + ":" +
			("0" + d.getMinutes()).slice(-2) + ":" +
			("0" + d.getSeconds()).slice(-2);
	
		return dateString;
	}

}
