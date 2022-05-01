import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public loginForm = new FormGroup({
		username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
		password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)])
	});

	constructor(

	) { }

	ngOnInit(): void {
		
	}

	public onSubmit(){
		
		if(this.loginForm.invalid){
			return;
		}
		
		console.log("submit :");
		console.log("Username: "+this.loginForm.value.username + " Password: "+this.loginForm.value.password);

	}

}
