import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthData } from './AuthData';

@Injectable({
	providedIn: 'root'
})
export class AuthDashboardService {

	private tokenSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");
	private usernameSubject : BehaviorSubject<string> = new BehaviorSubject<string>("");

	private authDataSubject: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(null);
	public authData$: Observable<AuthData> = this.authDataSubject.asObservable();

	public token$ : Observable<string> = this.tokenSubject.asObservable();
	public username$ : Observable<string> = this.usernameSubject.asObservable();

	constructor() { }
}
