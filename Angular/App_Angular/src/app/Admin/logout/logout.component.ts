import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	public auth = null;
	constructor(
		private authServices:AuthDashboardService,
		private router:Router,
	) { }

	ngOnInit(): void {
		this.authServices.authData$.subscribe(data=>this.auth = data);
		
		var a = this.authServices.GetAuthData();
		a.authenticator=false;
		a.token = "";
		this.router.navigate(['/login'])
		
	}

}
