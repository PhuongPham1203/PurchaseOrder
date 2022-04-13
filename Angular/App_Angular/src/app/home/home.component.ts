import { Component, OnDestroy, OnInit } from '@angular/core';
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
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			//console.log(data);
			this.dataPO = data;
		})
	}

}
