import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { RoleUser } from 'src/app/Models/authentication/enum-roles-user.model';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { environment } from 'src/environments/environment';
import { ServerHttpService } from '../server-http.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {



	private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({});
	public user: Observable<UserModel> = this.userSubject.asObservable();

	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	public isAuthenticated = this.isAuthenticatedSubject.asObservable();

	constructor(
		private cookieService: CookieService,
	) {

	}

	public get currentUserValue(): UserModel {
		return this.userSubject.value;
	}

	public setUser(user: UserModel): void {
		
		user = this.addUserRoles(user);
		
		this.userSubject.next(user);
		this.cookieService.set("token", user.token);
		this.setIsAuthenticated(true);
	}

	public getUser(): UserModel {
		return this.userSubject.value;
	}

	public clearUser(): void {
		this.userSubject.next({});
		this.cookieService.delete("token");
		this.setIsAuthenticated(false);
	}

	private setIsAuthenticated(isAuthenticated: boolean) {
		this.isAuthenticatedSubject.next(isAuthenticated);
	}

	public getIsAuthenticated(): boolean {
		return this.isAuthenticatedSubject.value;
	}

	private addUserRoles(userModel:UserModel):UserModel{
		
		if(userModel.department == null){
			return userModel;
		}
		

		switch(userModel.department){
			case "it-support-f":
				userModel.roles.push(RoleUser.IT_SUPPORT_ADD);
				userModel.roles.push(RoleUser.IT_SUPPORT_VIEW);
				userModel.roles.push(RoleUser.IT_SUPPORT_EDIT);
				userModel.roles.push(RoleUser.IT_SUPPORT_DELETE);
				break;
			case "it-support-v":
				userModel.roles.push(RoleUser.IT_SUPPORT_VIEW);
				break;
			case "sale-f":
				userModel.roles.push(RoleUser.SALE_ADD);
				userModel.roles.push(RoleUser.SALE_VIEW);
				userModel.roles.push(RoleUser.SALE_EDIT);
				userModel.roles.push(RoleUser.SALE_DELETE);
				break;
			case "manager-audit":
				userModel.roles.push(RoleUser.IT_SUPPORT_ADD);
				userModel.roles.push(RoleUser.IT_SUPPORT_VIEW);
				userModel.roles.push(RoleUser.IT_SUPPORT_EDIT);
				userModel.roles.push(RoleUser.IT_SUPPORT_DELETE);
				userModel.roles.push(RoleUser.SALE_ADD);
				userModel.roles.push(RoleUser.SALE_VIEW);
				userModel.roles.push(RoleUser.SALE_EDIT);
				userModel.roles.push(RoleUser.SALE_DELETE);
				break;
		}
		

		return userModel;
	}

}


