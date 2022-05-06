import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
	
	constructor(
		private authentication: AuthenticationService,
		private router: Router,
		
	) {
		this.logout();
	 }

	ngOnInit(): void {
		
	}

	private logout(){
		this.authentication.clearUser();
		this.router.navigate(["/login"]);
	}

}
