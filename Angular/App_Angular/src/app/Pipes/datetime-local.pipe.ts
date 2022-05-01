import {Pipe, PipeTransform} from '@angular/core';
import { InternationalizationService } from '../Services/Internationalization/internationalization.service';
import {formatDate} from "@angular/common";

@Pipe({name:'datetimelocal'})
export class DatetimeLocalPipe implements PipeTransform{

	private localization:string="en";

	constructor(
		private localizationService:InternationalizationService,
	){
		this.localizationService.localization$.subscribe(local=>this.localization = local); 
	}

	transform(stringDatetime: string):string {
		
		let dateTime = "";
		if(this.localization == "en"){
			dateTime = formatDate( stringDatetime,"dd/MM/yyyy HH:mm:ss","en");
		}else if(this.localization == "vi"){
			dateTime = formatDate( stringDatetime,"HH:mm:ss dd/MM/yyyy","en");
		}else{
			dateTime = formatDate( stringDatetime,"dd/MM/yyyy HH:mm:ss","en");
		}
		
		return dateTime;
	}
}