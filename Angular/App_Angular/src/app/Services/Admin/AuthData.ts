import { Observable } from "rxjs";

export class AuthData{
	constructor(
		public token$:Observable<string>,
		public username$:Observable<string>
	){}
}