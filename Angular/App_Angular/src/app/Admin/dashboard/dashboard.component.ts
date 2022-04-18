import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

	public auth = null;

	public tutorials: Observable<Tutorial[]>;


	constructor(
		private authServices:AuthDashboardService,
		private router:Router,
		private store:Store<AppState>
		) { 
			
		}

	ngOnInit(): void {
		
		this.authServices.authData$.subscribe(data=>this.auth = data);
		
		if( this.auth.authenticator==false){
			this.router.navigate(['/login'])
		}
		
		this.tutorials = this.store.select('tutorial');
		

	}

	public delTutorial(index:number){
		
		this.store.dispatch(new TutorialActions.RemoveTutorial(index));
	}

	

}
