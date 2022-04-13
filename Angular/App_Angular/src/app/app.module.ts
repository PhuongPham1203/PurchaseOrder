import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BoldDirective } from './Directives/bold.directive';
import {HttpClientModule} from '@angular/common/http';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailComponent } from './send-email/send-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PagenotfoundComponent,
    BoldDirective,
    PurchaseOrderDetailComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
