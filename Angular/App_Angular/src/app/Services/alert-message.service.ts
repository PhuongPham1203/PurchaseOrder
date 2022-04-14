import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlertMessageService {

	constructor() { }

	public CreateAlertError(message: string,id_parent:string) {
		var stringAlertError = `
	<div class="alert alert-danger alert-dismissible fade show" role="alert">
		<span><strong>Error:</strong> ${message}</span>
		<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
			<span aria-hidden="true"></span>
		</button>
	</div>`

		// create DOM element from string
		this.CreateAlert(stringAlertError,id_parent)
	}

	public CreateAlertSuccess(message: string,id_parent:string) {
		var stringAlertSuccess = `
	<div class="alert alert-success alert-dismissible fade show" role="alert">
		<span>${message}</span>
		<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
			<span aria-hidden="true"></span>
		</button>
	</div>`

		// create DOM element from string
		this.CreateAlert(stringAlertSuccess,id_parent)
	}

	private CreateAlert(stringAlert: string,id_parent:string) {
		// create DOM element from string
		var parser = new DOMParser();
		var doc = parser.parseFromString(stringAlert, 'text/html')
		var parent = document.getElementById(id_parent);
		parent.appendChild(doc.body);

		setTimeout(() => {
			try {
				parent.removeChild(parent.firstChild);
			} catch (error) { }
		}, 5000);
	}
}
