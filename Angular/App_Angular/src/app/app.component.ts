import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserModel } from './Models/authentication/user.model';
import { AuthenticationService } from './Services/authentication/authentication.service';
import { ServerHttpService } from './Services/server-http.service';
import{ RoleUser} from "./Models/authentication/enum-roles-user.model"
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
	
	public isAuthorized:boolean = false;
	public user:UserModel = new UserModel({});

	

	constructor(
		private authenticationService:AuthenticationService,
		private cookieService: CookieService,
		private serverHttp: ServerHttpService,
	){

	}
	ngOnInit(): void {
		this.authenticationService.user.subscribe(u=>this.user = u);
		this.authenticationService.isAuthenticated.subscribe(isAuth=>this.isAuthorized = isAuth);
		
	}

	

}
