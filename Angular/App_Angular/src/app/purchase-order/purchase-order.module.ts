import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';


@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderDetailComponent,
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule
  ]
})
export class PurchaseOrderModule { }
