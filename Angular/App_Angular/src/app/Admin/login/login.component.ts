import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';
import { AuthData } from 'src/app/Models/AuthData';
import { CookieService } from 'ngx-cookie-service';


export class MyErrorStateMatch implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public formLogin = new FormGroup({
		emailForm: new FormControl('', [Validators.required, Validators.email]),
		passwordForm: new FormControl('', [Validators.required])
	});

	public matcher = new MyErrorStateMatch();

	public auth:AuthData = new AuthData();

	constructor(
		private authServices: AuthDashboardService,
		private router: Router,
		private cookieService:CookieService
	) { }

	ngOnInit(): void {
		//this.authServices.authData$.subscribe(data => this.auth = data);
		if(this.cookieService.check('authenticator')){
			if(this.cookieService.get('authenticator')==='true'){
				this.auth = new AuthData(
					this.cookieService.get('token'),
					this.cookieService.get('username'),
					this.cookieService.get('authenticator')==='true',
					);
			}
		}
		
		if( this.auth.authenticator){
			this.router.navigate(['/dashboard']);
			//console.log('auth==true -> dashboard');
		}
	}

	public SubmitLogin() {

		//Submit username and pass to server then get token

		//console.log(this.formLogin.value['emailForm']);

		var auth = new AuthData("1287a878zxct7rzer2q89fda8cx",this.formLogin.value['emailForm'],true);
		
		this.cookieService.set('username',auth.username);
		this.cookieService.set('token',auth.token);
		this.cookieService.set('authenticator', String( auth.authenticator));
		
		//this.authServices.SetAuthData(auth);

		this.router.navigate(['/dashboard']);
	}
}
