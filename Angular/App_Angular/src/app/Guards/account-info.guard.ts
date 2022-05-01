import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AccountInfoGuard implements Resolve<any> {


	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
		let userObj={
			userId:10,
			username:'Katina'
		};

		return userObj;

	}

}
