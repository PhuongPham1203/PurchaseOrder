import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public user: UserModel = new UserModel({});
	public isAuthorized:boolean = false;
	constructor(
		private authentication: AuthenticationService,
		
		
	) { }
	
	ngOnInit(): void {
		this.authentication.user.subscribe(u => this.user = u);
		this.authentication.isAuthenticated.subscribe(isAuth =>this.isAuthorized = isAuth)
		
	}

	

	

}
