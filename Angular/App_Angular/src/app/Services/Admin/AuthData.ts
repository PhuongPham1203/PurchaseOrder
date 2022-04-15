import { Observable } from "rxjs";

export class AuthData{
	constructor(
		public token:string="",
		public username:string="",
		public authenticator:boolean=false
	){}
}