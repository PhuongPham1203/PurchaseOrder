import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';
import { AuthData } from 'src/app/Models/AuthData';


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

	public auth = null;

	constructor(
		private authServices: AuthDashboardService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.authServices.authData$.subscribe(data => this.auth = data);

		if( this.auth.authenticator){
			this.router.navigate(['/dashboard']);
			//console.log('auth==true -> dashboard');
		}
	}

	public SubmitLogin() {
		//console.log(this.formLogin.value['emailForm']);

		var auth = new AuthData("1287a878zxct7rzer2q89fda8cx",this.formLogin.value['emailForm'],true);
		this.authServices.SetAuthData(auth);

		this.router.navigate(['/dashboard']);
	}
}
