import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoleUser } from 'src/app/Models/authentication/enum-roles-user.model';

@Directive({
	selector: '[appRoleSale]'
})
export class RoleSaleDirective implements OnChanges {

	@Input() roles: RoleUser[];

	constructor(
		private elementRef: ElementRef
	) { }
	ngOnChanges(changes: SimpleChanges): void {
		if(this.roles.includes(RoleUser.SALE_VIEW)){
			this.elementRef.nativeElement.style.display = "block";
		}else{
			this.elementRef.nativeElement.style.display = "none";

		}
	}

}