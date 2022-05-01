import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InternationalizationService } from 'src/app/Services/Internationalization/internationalization.service';

@Component({
	selector: 'app-internationalization',
	templateUrl: './internationalization.component.html',
	styleUrls: ['./internationalization.component.css']
})
export class InternationalizationComponent implements OnInit, OnDestroy {

	public localization:string="en";

	constructor(
		private localizationService:InternationalizationService,
		private cookieService:CookieService,
		@Inject(LOCALE_ID) private locale:string
	) { }
	ngOnDestroy(): void {
		
	}

	ngOnInit(): void {
		this.locale = this.locale.split("-")[0];
		
		
		this.localizationService.localization$.subscribe(local=>this.localization = local); 
		
		if(this.cookieService.check("localization")){
			this.localizationService.setLocalization( this.cookieService.get("localization") );
		}else{
			this.setLocalization(this.locale);
			this.localizationService.setLocalization(this.locale);
			
		}
		

	}

	public setLocalization(localizationString:string){
		this.localization = localizationString;
		this.cookieService.set("localization",this.localization);
		window.location.reload();
	}



}
