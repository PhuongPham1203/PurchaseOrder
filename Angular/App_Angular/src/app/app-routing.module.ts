import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { PreferencesCheckGuard } from './Guards/preferences-check.guard';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';


const routes: Routes = [

	
	{ path: "", redirectTo:"dashboard",pathMatch:"full" },
	{ path: "dashboard", component:DashboardComponent },
	{ path: "login", component: LoginComponent },
	{ path: "logout", component: LogoutComponent },


	{path:"purchaseorder",component:HomeComponent},
	{ path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
	{ path: "sendemail/:id", component: SendEmailComponent },
	/*
	{path:"",children:[
		{path:"",component:HomeComponent},
		//{path:":id",redirectTo:"purchaseorder/:id",pathMatch:"full"},
		{path:"purchaseorder",component:HomeComponent},
		//{path:"purchaseorder/:id",component:HomeComponent},
	]},
	{ path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
	{ path: "sendemail/:id", component: SendEmailComponent },

	{path:"admin",loadChildren:()=>import("./users/admin/admin.module").then(mod=>mod.AdminModule)},
	{path:"user",loadChildren:()=>import("./users/user/user.module").then(mod=>mod.UserModule)},

	{ path: 'preferences', loadChildren: () => import('./preferences/preferences.module').then(m => m.PreferencesModule),canLoad:[PreferencesCheckGuard] },

	//{path:"addcontact",component:AddContactComponent,outlet:"addContact"},
	//{path:"editcontact",component:EditContactComponent,outlet:"editContact"},

	*/
	{ path: "**", component: PagenotfoundComponent }


];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],


	exports: [RouterModule]
})
export class AppRoutingModule { }
