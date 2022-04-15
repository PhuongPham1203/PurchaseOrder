import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Admin/login/login.component';
import { LogoutComponent } from './Admin/logout/logout.component';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';


const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "home", component: HomeComponent },
	{ path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
	{ path: "sendemail/:id", component: SendEmailComponent },
	{ path: "login", component: LoginComponent },
	{ path: "logout", component: LogoutComponent },
	{ path: "dashboard", component: DashboardComponent },
	{ path: "**", component: PagenotfoundComponent }


];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],

	
	exports: [RouterModule]
})
export class AppRoutingModule { }
