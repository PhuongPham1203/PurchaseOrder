import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class DashboardActivateGuard implements CanActivate {

	private user: UserModel = new UserModel({});
	private isAuthorized:boolean = false;

	constructor(
		private authentication: AuthenticationService,
		private router: Router
	) {
		this.authentication.user.subscribe(u => this.user = u);
		this.authentication.isAuthenticated.subscribe(isAuth=> this.isAuthorized = isAuth)
	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			
			if(this.isAuthorized){
				return true;

			}else{
				this.router.navigate(["/login"])
				return false
			}
			

			


	}
	

}
