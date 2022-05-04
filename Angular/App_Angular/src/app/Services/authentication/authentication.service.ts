import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { environment } from 'src/environments/environment';
import { ServerHttpService } from '../server-http.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {



	private userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(new UserModel(null));
	public user$: Observable<UserModel> = this.userSubject.asObservable();

	constructor(
		private serverHttp: ServerHttpService,
		private cookieService: CookieService
	) { }

	public setUser(user: UserModel): void {
		this.userSubject.next(user);
	}

	public login(userModel: UserModel) {
		this.setUser(userModel);
		this.cookieService.set("token", userModel.token);
	}


	public logout() {
		this.setUser(new UserModel(null));
		this.cookieService.delete("token");
	}

	public isTokenValid(token: string): UserModel | boolean {
		let isValid: UserModel | boolean = false;

		let url = environment.domainUrl + "/authentication/checktoken";
		this.serverHttp.postAPIWithData(url, token).subscribe((res) => {

			if (res != null) {
				isValid = new UserModel(res);
				isValid.authentication = true;
			} else {
				isValid = false;
			}
		});

		return isValid;
	}
}
