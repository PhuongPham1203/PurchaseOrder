import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';
import { cloneDeep } from 'lodash';
import { AlertMessageService } from '../Services/alert-message.service';


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
		private router: Router,
		private alertMessage: AlertMessageService
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
			if (this.dataSendingEmail.cancelPo == true) {
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
		this.dataSendingEmail.orderSendToEmailCc = "";
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

		let body = new FormData();
		body.append("emailDetail", JSON.stringify(dataPOST));

		this.serverHttp.postAPIWithData(url, body).subscribe((data) => {

			if (data == "Update Success") {
				this.alertMessage.CreateAlertSuccess(data, 'all-alert');
				
			} else {
				this.alertMessage.CreateAlertError(data, 'all-alert')
			}

		});
	}

	

	public CheckEmailToNotValid(): boolean {
		var str = this.dataSendingEmail.orderSendToEmail;
		if (str.includes('@')) {
			return false;
		}
		return true;
	}
	public CheckEmailCCNotValid() {
		var str = this.dataSendingEmail.orderSendToEmailCc;
		if (str == null || str == '') {

		} else if (str.includes(',')) {
			var listEmail = str.split(',');
			for (let email of listEmail) {
				if (email.includes('@') == false) {
					return true
				}
			}
			return false;
		} else {
			if (str.includes('@') == false) {
				return true
			}
		}
		return false;
	}



}

