import { Component, OnInit } from '@angular/core';
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
		private serverHttp: ServerHttpService
    ) { }

  ngOnInit(): void {
  }

}
