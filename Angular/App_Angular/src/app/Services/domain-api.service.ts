import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DomainAPIService {

	constructor() { }

	private urlPO = "https://localhost:4321";

	public getUrlPO() {
		return this.urlPO;
	}
}
