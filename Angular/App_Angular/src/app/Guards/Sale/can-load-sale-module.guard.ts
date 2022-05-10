import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleUser } from 'src/app/Models/authentication/enum-roles-user.model';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadSaleModuleGuard implements CanLoad {
	public user: UserModel = new UserModel({});
	constructor(
		private authentication: AuthenticationService,
		private router:Router
	){
		this.authentication.user.subscribe(u => this.user = u);
	}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
		
		try{
			if(this.user.roles.includes(RoleUser.SALE_VIEW)){
				return true;
			}else{
				
				this.router.navigate(["/dashboard"])
				return false;
			}
		}catch(ex){
			this.router.navigate(["/dashboard"])
			return false;
		}
		
  }
}
