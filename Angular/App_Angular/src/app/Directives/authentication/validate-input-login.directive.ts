import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appValidateInputLogin]'
})
export class ValidateInputLoginDirective implements OnChanges {


	@Input() errorInvalid: boolean;
	@Input() touched: boolean;
	constructor(
		private elementRef: ElementRef
	) { }
	ngOnChanges(changes: SimpleChanges): void {
		if (this.touched) {

			if (this.errorInvalid) {
				this.elementRef.nativeElement.style.display = "block";
			} else {
				this.elementRef.nativeElement.style.display = "none";
			}
		} else {
			this.elementRef.nativeElement.style.display = "none";
		}


	}


}
