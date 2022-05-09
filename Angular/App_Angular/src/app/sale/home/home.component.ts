import { AfterViewInit, Component, OnDestroy, OnInit ,LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessageService } from '../../Services/alert-message.service';
import { DatetimeService } from '../../Services/datetime.service';
import { DomainAPIService } from '../../Services/domain-api.service';
import { ServerHttpService } from '../../Services/server-http.service';

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
		private alertMessage: AlertMessageService,
		private route: ActivatedRoute,
		private router: Router,
		@Inject(LOCALE_ID) private locale:string
	) {

	}
	

	public dataPO = null;
	public lengthPO = 0;
	public pageIndex = 0;
	public pageSize = 10;

	public paginationIndex = [-2,-1,0,1,2];

	ngOnInit(): void {
		let index:number = 0;
		if(this.route.snapshot.paramMap.get('id')!=null){
			index = parseInt( this.route.snapshot.paramMap.get('id') )*10;
		}
		

		this.loadingListPurchaserOrder(index);
		this.loadingPagination()		
		
	}

	ngAfterViewInit(): void {
		//console.log(this.locale);
	}


	// display List Purchase Order
	public loadingListPurchaserOrder(index) {
		var url = this.domainAPI.getUrlPO() + "/purchaseorder/getlistpurchaseorder/"+index;
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			this.dataPO = data;
			this.pageIndex = index;
		},(error)=>{
			console.log(error );
			this.alertMessage.createAlertError(error,'all-alert',10000);
		})
	}

	public loadingPagination(){
		var url = this.domainAPI.getUrlPO() + "/purchaseorder/getlengthlistpo";
		
		this.serverHttp.getAPI(url).subscribe((data) => {
			//console.log(data);
			this.lengthPO = data;
		})
	}

	public loadPreviousPage(){
		
		if(this.pageIndex-this.pageSize>=0){
			this.loadingListPurchaserOrder(this.pageIndex-this.pageSize);
		}

	}
	public loadNextPage(){
		/*
		console.log((this.pageIndex+this.pageSize)/10);
		this.router.navigate(["/purchaseorder",(this.pageIndex+this.pageSize)/10]);
		*/
		if(this.pageIndex<this.lengthPO){
			this.loadingListPurchaserOrder(this.pageIndex+this.pageSize);
		}
	}

	public hiddenIndexPagination(index:number){
		return this.pageIndex/this.pageSize+1+index<=0 || this.pageSize*(this.pageIndex/this.pageSize+index)>=this.lengthPO;
	}
}
