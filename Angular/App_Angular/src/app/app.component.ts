import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserModel } from './Models/authentication/user.model';
import { AuthenticationService } from './Services/authentication/authentication.service';
import { ServerHttpService } from './Services/server-http.service';
import { RoleUser } from "./Models/authentication/enum-roles-user.model"
import { debounceTime } from 'rxjs';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	public user: UserModel = new UserModel({});
	public isRunCheckToken:boolean = false;

	constructor(
		private authenticationService: AuthenticationService,
		private cookieService: CookieService,
		private serverHttp: ServerHttpService
	) {
	}
	ngOnInit(): void {
		this.authenticationService.user.subscribe(user => this.user = user)
		if (this.cookieService.check("token")) {
			this.checkToken(this.cookieService.get("token"));
		}
	}

	private checkToken(token: string) {
		let url = environment.domainUrl + "/authentication/checktoken";

		let data: UserModel = new UserModel({
			token: token
		})

		this.serverHttp.postAPIWithData(url, data).subscribe((res) => {

			if (res != null) {
				let userModel: UserModel = new UserModel(res as UserModel);
				this.authenticationService.setUser(userModel);
			}
			this.isRunCheckToken = true
			console.log(this.isRunCheckToken)
		});

	}

}
