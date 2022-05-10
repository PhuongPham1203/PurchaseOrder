import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { CanLoadAccountModuleGuard } from './Guards/Account/can-load-account-module.guard';
import { DashboardActivateGuard } from './Guards/Authentication/dashboard-activate.guard';
import { LoginActivateGuard } from './Guards/Authentication/login-activate.guard';
import { CanLoadSaleModuleGuard } from './Guards/Sale/can-load-sale-module.guard';

import { HomeComponent } from './sale/home/home.component';
import { PagenotfoundComponent } from './Layouts/pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './sale/purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './sale/send-email/send-email.component';


const routes: Routes = [

	
	{ path: "", redirectTo:"login",pathMatch:"full" },
	{ path: "dashboard", component:DashboardComponent ,canActivate:[DashboardActivateGuard]},
	{ path: "login", component: LoginComponent, canActivate:[LoginActivateGuard]},
	{ path: "logout", component: LogoutComponent },


	

	// Account Module
	{path:"account",loadChildren:()=>import("./account-manager/account-manager.module").then(module=>module.AccountManagerModule),canLoad:[CanLoadAccountModuleGuard]},
	{path:"sale",loadChildren:()=>import("./sale/sale.module").then(module=>module.SaleModule),canLoad:[CanLoadSaleModuleGuard]},

	{ path: "**", component: PagenotfoundComponent }


];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],


	exports: [RouterModule]
})
export class AppRoutingModule { }
