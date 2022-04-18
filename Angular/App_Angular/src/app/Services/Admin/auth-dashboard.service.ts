import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthData } from '../../Models/AuthData';

@Injectable({
	providedIn: 'root'
})
export class AuthDashboardService {

	//private tokenSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");
	//private usernameSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");

	
	//public token$ : Observable<string> = this.tokenSubject.asObservable();
	//public username$ : Observable<string> = this.usernameSubject.asObservable();

	private authDataSubject: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(new AuthData());
	public authData$: Observable<AuthData> = this.authDataSubject.asObservable();

	 
	constructor() { }

	public GetAuthData(){
		return this.authDataSubject.getValue();
	}

	public SetAuthData(data:AuthData){
		this.authDataSubject.next(data);
	}

}
