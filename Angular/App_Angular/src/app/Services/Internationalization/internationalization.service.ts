import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class InternationalizationService {

	private localizationSubject: BehaviorSubject<string> = new BehaviorSubject<string>("en");
	public localization$ : Observable<string> = this.localizationSubject.asObservable();

	constructor() { }

	public setLocalization(localString:string):void{
		this.localizationSubject.next(localString);
	}
}
