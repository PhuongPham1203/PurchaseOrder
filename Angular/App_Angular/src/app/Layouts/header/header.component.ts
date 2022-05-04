import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public user: UserModel = new UserModel(null);
	constructor(
		private authentication: AuthenticationService,
		private cookieService: CookieService,
		private serverHttp: ServerHttpService,
	) { }

	ngOnInit(): void {
		this.authentication.user$.subscribe(u => this.user = u);
	}

}
