import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InternationalizationService } from 'src/app/Services/Internationalization/internationalization.service';

@Component({
	selector: 'app-internationalization',
	templateUrl: './internationalization.component.html',
	styleUrls: ['./internationalization.component.css']
})
export class InternationalizationComponent implements OnInit, OnDestroy {

	public localization:string ;

	constructor(
		private localizationService:InternationalizationService,
		private cookieService:CookieService
	) { }
	ngOnDestroy(): void {
		
	}

	ngOnInit(): void {

		this.localizationService.localization$.subscribe(local=>this.localization = local); 

		if(this.cookieService.check("localization")){
			this.localization = this.cookieService.get("localization");
			this.localizationService.setLocalization(this.localization);
		}
	}

	public setLocalization(localizationString:string){
		this.localization = localizationString;
		this.cookieService.set("localization",this.localization);
	}



}
