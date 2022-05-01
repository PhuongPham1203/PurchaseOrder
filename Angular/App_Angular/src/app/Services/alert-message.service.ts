import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlertMessageService {

	constructor() { }

	public createAlertError(message: string,id_parent:string,time:number = 5000) {
		var stringAlertError = `
	<div class="alert alert-danger alert-dismissible fade show" role="alert">
		<span><strong>Error:</strong> ${message}</span>
		<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
			<span aria-hidden="true"></span>
		</button>
	</div>`

		// create DOM element from string
		this.createAlert(stringAlertError,id_parent)
	}

	public createAlertSuccess(message: string,id_parent:string, time:number = 5000) {
		var stringAlertSuccess = `
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		<span>${message}</span>
		<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
			<span aria-hidden="true"></span>
		</button>
	</div>`

		// create DOM element from string
		this.createAlert(stringAlertSuccess,id_parent)
	}

	private createAlert(stringAlert: string,id_parent:string,time:number = 5000) {
		// create DOM element from string
		var parser = new DOMParser();
		var doc = parser.parseFromString(stringAlert, 'text/html')
		var parent = document.getElementById(id_parent);
		parent.appendChild(doc.body);

		setTimeout(() => {
			try {
				parent.removeChild(parent.firstChild);
			} catch (error) { }
		}, time);
	}
}
