import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'app-alert-popup',
	templateUrl: './alert-popup.component.html',
	styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit , AfterViewInit{

	@Input() message= "";
	@Input() typeSuccess= true;


	constructor(
		private viewContainerRef:ViewContainerRef,
		private elementRef: ElementRef

	) { }
	ngAfterViewInit(): void {
		setTimeout(this.deleteSelf,3000);
	}
	
	ngOnInit(): void {
		
	}



	private deleteSelf(){
		console.log("deleteSelf");
		//this.elementRef.nativeElement.parentNode.removeChild(this.elementRef.nativeElement);
		this.viewContainerRef.element.nativeElement.parentElement.removeChild(this.viewContainerRef.element.nativeElement);

	}

}
