import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/authentication/user.model';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ServerHttpService } from 'src/app/Services/server-http.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public user: UserModel = new UserModel(null);

	public loginForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
		password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)])
	});

	constructor(
		private serverHttp: ServerHttpService,
		private toastr: ToastrService,
		private router: Router,
		private authentication: AuthenticationService,
		private cookieService: CookieService,
	) { }

	ngOnInit(): void {
		//console.log(this.user);
		this.authentication.user$.subscribe(u => this.user = u);
		console.log(this.cookieService.get("token"))
		if (this.user.authentication == false) {
			if (this.cookieService.check("token")) {
				let userIsValid = this.authentication.isTokenValid(this.cookieService.get("token"));
				if(userIsValid!=false){

					this.authentication.setUser(userIsValid as UserModel);
				}
			}

		}else{
			this.router.navigate(["/dashboard"]);
		}

	}

	public onSubmit() {

		if (this.loginForm.invalid) {
			return;
		}


		let url = environment.domainUrl + "/authentication/login";

		this.serverHttp.postAPIWithData(url, this.loginForm.getRawValue()).subscribe((res) => {

			if (res == null) {
				this.toastr.error("Username or password is invalid!", "Error");
			} else {
				//console.log(res);
				let userModel = new UserModel(res);
				userModel.authentication = true;

				this.authentication.login(userModel);

				this.router.navigate(["/dashboard"]);
			}
		});

	}

	

}
