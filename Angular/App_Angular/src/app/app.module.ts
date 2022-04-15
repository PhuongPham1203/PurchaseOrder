import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BoldDirective } from './Directives/bold.directive';
import { HttpClientModule } from '@angular/common/http';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SendEmailComponent } from './send-email/send-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Layouts/header/header.component';
import { LoadingComponent } from './Layouts/loading/loading.component';
import { AlertPopupComponent } from './Layouts/alert-popup/alert-popup.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './Admin/login/login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { LogoutComponent } from './Admin/logout/logout.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PagenotfoundComponent,
		BoldDirective,
		PurchaseOrderDetailComponent,
		SendEmailComponent,
		HeaderComponent,
		LoadingComponent,
		AlertPopupComponent,
  LoginComponent,
  DashboardComponent,
  LogoutComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgbModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatInputModule
		
	],
	providers: [
		
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
