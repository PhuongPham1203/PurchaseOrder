import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoldDirective } from './Directives/bold.directive';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { LoadingComponent } from './Layouts/loading/loading.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { InternationalizationComponent } from './Layouts/internationalization/internationalization.component';
import { DatetimeLocalPipe } from './Pipes/datetime-local.pipe';
import { CurrencyLocalPipe } from './Pipes/currency-local.pipe';
import { HighlightDirective } from './Directives/highlight.directive';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ValidateInputLoginDirective } from './Directives/authentication/validate-input-login.directive';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';

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
		InternationalizationComponent,

		DatetimeLocalPipe,
		CurrencyLocalPipe,
  HighlightDirective,
  LoginComponent,
  LogoutComponent,
  ValidateInputLoginDirective,
  DashboardComponent,

 
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
		MatInputModule,
		MatDatepickerModule,
		MatCardModule


	],
	providers: [
		/*{
			provide:LocationStrategy, useClass: HashLocationStrategy
		}*/
		
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
