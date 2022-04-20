import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	public auth = null;
	constructor(
		private authServices: AuthDashboardService,
		private router: Router,
		private cookieService:CookieService
	) { }

	ngOnInit(): void {
		//this.authServices.authData$.subscribe(data=>this.auth = data);

		this.cookieService.delete('token');
		this.cookieService.delete('username');
		this.cookieService.delete('authenticator');

			this.router.navigate(['/login'])

	}

}
