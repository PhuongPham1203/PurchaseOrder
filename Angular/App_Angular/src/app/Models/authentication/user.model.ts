import { RoleUser } from "./enum-roles-user.model";

export class UserModel  {
	public username?: string;
	public token?: string;
	public department?:string;
	public roles?:RoleUser[]=[];

	constructor(user){
		Object.assign(this,user);
	}

}