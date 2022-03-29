import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "purchaseorderdetail/:id", component: PurchaseOrderDetailComponent },
  { path: "sendemail/:id", component: SendEmailComponent },
  { path: "**", component: PagenotfoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
