import { Directive } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';

@Directive({
	selector: '[appValidateSCCEmail]'
})
export class ValidateSCCEmailDirective implements Validators {

	constructor() { }

	static validateEmail(emailDomain: string) {
		return (control: AbstractControl): { [key: string]: any } | null => {
			let value: string = control.value;
			let arrayValueSplit = value.split(emailDomain);
			if (arrayValueSplit.length > 1 && arrayValueSplit[arrayValueSplit.length - 1] == "") {
				return null
			}
			return { "emailInvalid": true };
		}
	}

	

}
