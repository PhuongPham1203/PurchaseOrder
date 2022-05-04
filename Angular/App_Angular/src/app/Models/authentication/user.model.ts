export interface IUserModel {
	username: string;
	token: string;
	department:string;
	authentication: boolean;
}

export class UserModel implements IUserModel {
	public username: string="";
	public token: string="";
	public department:string="";
	public authentication: boolean=false;

	constructor(user){
		Object.assign(this,user);
	}

}