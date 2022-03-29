import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';
import { cloneDeep } from 'lodash';

@Component({
	selector: 'app-send-email',
	templateUrl: './send-email.component.html',
	styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

	constructor(
		private domainAPI: DomainAPIService,
		private serverHttp: ServerHttpService,
		public datetimeFormat: DatetimeService,
		private route: ActivatedRoute,
		private router: Router
		) { }

	public dataSendingEmail = null;


	ngOnInit(): void {

		var index = this.route.snapshot.paramMap.get('id');

		this.UpdateSendingEmail(index);
	}

	private UpdateSendingEmail(index) {
		var url = this.domainAPI.getUrlPO() + "/SendingEmail/GetSendEmailDetail/" + index;
		this.serverHttp.getAPI(url).subscribe((data) => {
			this.dataSendingEmail = data;
			if(this.dataSendingEmail.cancelPo == true){
				this.router.navigate(['/'])
			}
			if (!this.dataSendingEmail.sendEmail) {

				this.LoadDefaulEmail()
			}

		});
	}

	private LoadDefaulEmail() {

		this.dataSendingEmail.orderSendFromEmail = this.dataSendingEmail.stockSite + "@abc.com";
		this.dataSendingEmail.orderSendToEmail = this.dataSendingEmail.supplierShortname + "@abc.com";
		this.dataSendingEmail.emailSubject = "Order [ " + this.dataSendingEmail.orderNo + " - " + this.dataSendingEmail.stockName + " ]";

		var headersEmail =
			"Dear " + this.dataSendingEmail.supplierName + ",\n\n" +
			"PO number : " + this.dataSendingEmail.orderNo + "\n" +
			"This is email to order some product: " + "\n\n";
		var bodyEmail = "";

		for (let i = 0; i < this.dataSendingEmail.listPOLInSendEmailPages.length; i++) {
			bodyEmail +=
				"\t- " +
				this.dataSendingEmail.listPOLInSendEmailPages[i].partNumber + "\t" +
				this.dataSendingEmail.listPOLInSendEmailPages[i].qtyOrdered + "\t" +
				this.dataSendingEmail.listPOLInSendEmailPages[i].m2BuyPrice + "\n"
		}

		var footerEmail =
			"\nBest Regards," + "\n" +
			this.dataSendingEmail.supplierName;

		this.dataSendingEmail.emailContent = headersEmail + bodyEmail + footerEmail;

	}

	public PostSendEmail() {
		var url = this.domainAPI.getUrlPO() + "/SendingEmail/PostSendEmailDetail";

		var dataPOST = cloneDeep(this.dataSendingEmail);
		console.log(dataPOST);

		let body = new FormData();
		body.append("emailDetail", JSON.stringify(dataPOST));

		this.serverHttp.postAPIWithData(url, body).subscribe((data) => {
			if (data == "Update Success") {
				this.CreateAlertSuccess(data);
			} else{
				this.CreateAlertError(data)
			}
			console.log(data);
		});
	}

	
	private CreateAlertError(message: string) {
		var stringAlertError = `
		<div class="alert alert-danger alert-dismissible fade show" role="alert">
			<span><strong>Error:</strong> ${message}</span>
			<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
				<span aria-hidden="true"></span>
			</button>
		</div>`

		// create DOM element from string
		this.CreateAlert(stringAlertError)
	}

	private CreateAlertSuccess(message: string) {
		var stringAlertSuccess = `
		<div class="alert alert-success alert-dismissible fade show" role="alert">
			<span>${message}</span>
			<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert">
				<span aria-hidden="true"></span>
			</button>
		</div>`

		// create DOM element from string
		this.CreateAlert(stringAlertSuccess)
	}

	private CreateAlert(stringAlert: string) {
		// create DOM element from string
		var parser = new DOMParser();
		var doc = parser.parseFromString(stringAlert, 'text/html')
		document.getElementById('all-alert').appendChild(doc.body);
	}
}

