import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public user: UserModel = new UserModel({});
	constructor(
		private authentication: AuthenticationService,
	) { }

	ngOnInit(): void {
		this.authentication.user.subscribe(u => this.user = u);
	}

}
