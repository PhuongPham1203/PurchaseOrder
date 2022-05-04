import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	) { }

	ngOnInit(): void {
		this.authentication.logout();
		this.router.navigate(["/login"]);
	}

}
