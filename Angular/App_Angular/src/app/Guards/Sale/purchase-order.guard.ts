import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleUser } from 'src/app/Models/authentication/enum-roles-user.model';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class PurchaseOrderGuard implements CanActivate, CanActivateChild {
	public user: UserModel = new UserModel({});
	constructor(
		private authentication: AuthenticationService,
		private router: Router,
	) {
		this.authentication.user.subscribe(u => this.user = u);

		
	}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		console.log(this.authentication.getUser().roles)
		if(this.authentication.getUser().roles.includes(RoleUser.SALE_VIEW)){
			return true;
		}else{
			//this.router.navigate(["/dashboard"]);
			return false;

		}
		
	}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
	}

}
