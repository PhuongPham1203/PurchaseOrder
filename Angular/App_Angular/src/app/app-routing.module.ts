import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
  { path: "sendemail/:id", component: SendEmailComponent },
  { path: "**", component: PagenotfoundComponent }


];

@NgModule({
  imports: [
	  RouterModule.forRoot(routes),
	  BrowserAnimationsModule,
	  BrowserModule,
	  MatNativeDateModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
