import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
	selector: 'app-purchase-order-detail',
	templateUrl: './purchase-order-detail.component.html',
	styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

	constructor(
		private domainAPI: DomainAPIService,
		private serverHttp: ServerHttpService,
		public datetimeFormat: DatetimeService,
		private router:Router
	) { }

	public dataPODetail = null;

	ngOnInit(): void {
		
		var index = this.router.url.split("/").pop()

		this.updatePurchaserOrderDetail(index);

		console.log(this.dataPODetail);

	}

	// display Purchase Order Detail
	public updatePurchaserOrderDetail(index) {
		var url = this.domainAPI.getUrlPO() + "/PurchaseOrderDetail/GetPurchaseOrderDetail/"+index;
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			this.dataPODetail = data;
		})
	}


}
