import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appHighlight]'
})
export class HighlightDirective {

	constructor(
		private el: ElementRef
	) { 
		el.nativeElement.hidden = false;
		el.nativeElement.style.display = "block";
	}

}
