import { Pipe, PipeTransform } from '@angular/core';
import { InternationalizationService } from '../Services/Internationalization/internationalization.service';
import { formatCurrency, getCurrencySymbol,formatNumber } from '@angular/common';


@Pipe({
	name: 'currencylocal'
})
export class CurrencyLocalPipe implements PipeTransform {

	private localization:string="en";

	constructor(
		private localizationService:InternationalizationService,
	){
		this.localizationService.localization$.subscribe(local=>this.localization = local); 
		
	}
	
	transform(money: number): string {

		let stringMoney:string="";
		switch(this.localization){
			case "en":
				stringMoney = formatCurrency(money,"en",getCurrencySymbol("GBP","wide"));
				break;
			case "fr":
				stringMoney = formatCurrency(money,"en",getCurrencySymbol("EUR","wide"));
				break
			case "vi":
				stringMoney = formatNumber(money,"en",".0-2")+" "+ getCurrencySymbol("VND","wide");
				break
			default:
				stringMoney = formatCurrency(money,"en",getCurrencySymbol("GBP","wide"));
		}

		return stringMoney;

	}

}
