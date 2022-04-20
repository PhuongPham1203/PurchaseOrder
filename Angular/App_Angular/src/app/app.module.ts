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
import { StoreModule } from '@ngrx/store';
import { AddItemComponent } from './Admin/add-item/add-item.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Admin/login/login.component';
import { LogoutComponent } from './Admin/logout/logout.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoldDirective } from './Directives/bold.directive';
import { HomeComponent } from './home/home.component';
import { AlertPopupComponent } from './Layouts/alert-popup/alert-popup.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { LoadingComponent } from './Layouts/loading/loading.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { reducer } from './Reducers/tutorial.reducer';
import { SendEmailComponent } from './send-email/send-email.component';







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
		LogoutComponent,
		AddItemComponent
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

		StoreModule.forRoot({
			tutorial: reducer
		})
	],
	providers: [

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
