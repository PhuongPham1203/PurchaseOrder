import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertMessageService } from '../Services/alert-message.service';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {

	constructor(
		private domainAPI: DomainAPIService,
		private serverHttp: ServerHttpService,
		public datetimeFormat : DatetimeService,
		private alertMessage: AlertMessageService
	) {

	}
	

	public dataPO = null;
	public lengthPO = 0;
	public pageIndex = 0;
	public pageSize = 10;

	public paginationIndex = [-2,-1,0,1,2];

	ngOnInit(): void {

		this.LoadingListPurchaserOrder(0);
		this.LoadingPagination()		
		
	}

	ngAfterViewInit(): void {
		
	}


	// display List Purchase Order
	public LoadingListPurchaserOrder(index) {
		var url = this.domainAPI.getUrlPO() + "/purchaseorder/getlistpurchaseorder/"+index;
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			this.dataPO = data;
			this.pageIndex = index;
		},(error)=>{
			console.log(error );
			this.alertMessage.CreateAlertError(error,'all-alert',10000);
		})
	}

	public LoadingPagination(){
		var url = this.domainAPI.getUrlPO() + "/purchaseorder/getlengthlistpo";
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			//console.log(data);
			this.lengthPO = data;
		})
	}

	public LoadPreviousPage(){
		
		if(this.pageIndex-this.pageSize>=0){
			this.LoadingListPurchaserOrder(this.pageIndex-this.pageSize);
		}

	}
	public LoadNextPage(){
		if(this.pageIndex<this.lengthPO){
			this.LoadingListPurchaserOrder(this.pageIndex+this.pageSize);
		}
	}

	public HiddenIndexPagination(index:number){
		return this.pageIndex/this.pageSize+1+index<=0 || this.pageSize*(this.pageIndex/this.pageSize+index)>=this.lengthPO;
	}
}
