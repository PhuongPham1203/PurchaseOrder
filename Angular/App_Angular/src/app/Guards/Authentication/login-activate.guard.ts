import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

	public user: UserModel = new UserModel({});
	public isAuthorized: boolean = false;

	constructor(
		private authenticationService: AuthenticationService,
		private cookieService: CookieService,
		private serverHttp: ServerHttpService,
		private router: Router,
	) {
		this.authenticationService.user.subscribe(u => this.user = u);
		this.authenticationService.isAuthenticated.subscribe(isAuth => this.isAuthorized = isAuth);
	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.isAuthorized == false) {

			if (this.cookieService.check("token")) {
				this.checkToken(this.cookieService.get("token"));
			}
		}else{
			this.router.navigate(["/dashboard"]);
			return false;
		}

		return true;

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



				this.router.navigate(["/dashboard"]);
				


			}

		});




	}

}
