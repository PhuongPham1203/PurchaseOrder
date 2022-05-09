import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderGuard } from '../Guards/Sale/purchase-order.guard';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path:"",redirectTo:"purchaseorder",pathMatch:"full"},
	{path:"purchaseorder",component:HomeComponent,canActivate:[PurchaseOrderGuard]},
	{ path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
	{ path: "sendemail/:id", component: SendEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
