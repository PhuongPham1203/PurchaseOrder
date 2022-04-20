import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/Models/AuthData';
import { Tutorial } from 'src/app/Models/tutorial.model';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';
import { AppState } from 'src/app/States/app.state';

import * as TutorialActions from './../../Actions/tutorial.actions';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public auth:AuthData = new AuthData();

	public tutorials: Observable<Tutorial[]>;


	constructor(
		private authServices:AuthDashboardService,
		private router:Router,
		private store:Store<AppState>,
		private cookieService:CookieService
		) { 
			
		}

	ngOnInit(): void {
		
		//this.authServices.authData$.subscribe(data=>this.auth = data);
		if(this.cookieService.check('authenticator')){
			this.auth = new AuthData(
				this.cookieService.get('token'),
				this.cookieService.get('username'),
				this.cookieService.get('authenticator')==='true'
				);
		}
		

		if( this.auth.authenticator==false){
			this.router.navigate(['/login'])
		}
		
		this.tutorials = this.store.select('tutorial');
		

	}

	public delTutorial(index:number){
		
		this.store.dispatch(new TutorialActions.RemoveTutorial(index));
	}

	

}
