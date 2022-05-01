import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatetimeService } from '../Services/datetime.service';
import { DomainAPIService } from '../Services/domain-api.service';
import { ServerHttpService } from '../Services/server-http.service';
import { cloneDeep } from 'lodash';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from '../Services/alert-message.service';

@Component({
	selector: 'app-purchase-order-detail',
	templateUrl: './purchase-order-detail.component.html',
	styleUrls: ['./purchase-order-detail.component.css'],
	
})


export class PurchaseOrderDetailComponent implements OnInit {

	constructor(
		private domainAPI: DomainAPIService,
		private serverHttp: ServerHttpService,
		public datetimeFormat: DatetimeService,
		private route: ActivatedRoute,
		private router: Router,
		private ngbModal: NgbModal,
		private alertMessage: AlertMessageService
	) { }

	public dataPODetail = null;
	public listPartNumberSelected = [];


	ngOnInit(): void {

		//var index = this.router.url.split("/").pop()
		var index = this.route.snapshot.paramMap.get('id');

		this.updatePurchaseOrderDetail(index);


	}

	// display Purchase Order Detail
	private updatePurchaseOrderDetail(index) {
		var url = this.domainAPI.getUrlPO() + "/PurchaseOrderDetail/GetPurchaseOrderDetail/" + index;

		this.serverHttp.getAPI(url).subscribe((data) => {
			this.dataPODetail = data;
			
			try {
				this.dataPODetail.orderDate = this.datetimeFormat.string2DataInputForm(this.dataPODetail.orderDate);

				for (let i = 0; i < this.dataPODetail.purchaseOrderLines.length; i++) {
					var dateInput = this.datetimeFormat.string2DataInputForm(this.dataPODetail.purchaseOrderLines[i].orderDate);
					this.dataPODetail.purchaseOrderLines[i].orderDate = dateInput;

					// remove Part number already in POL
					this.listPartNumberSelected.push(this.dataPODetail.purchaseOrderLines[i].partNumber);

				}

			} catch (e) {
				if (data == null) {
					this.alertMessage.createAlertError("This PO is not available", 'all-alert', 10000);
				}

				setTimeout(()=>{
					this.router.navigate(['/'])
				},3000 );
			}

		}, (error) => {
			console.log(error);
			this.alertMessage.createAlertError(error, 'all-alert', 10000);
		})
	}

	// sum price of all PO Line in PO
	public totalPricePO() {
		var sum = 0;
		for (let item of this.dataPODetail.purchaseOrderLines) {
			sum += item.qtyOrdered * item.m2BuyPrice
		}

		return sum;
	}



	public removeMultipleItemFromList(original, remove) {
		return original.filter(value => !remove.includes(value));
	}

	public getItemInListBy_PartNumber(listParts, partNumber) {
		var part = null;
		listParts.forEach((value, index) => {
			if (value.partNumber === partNumber) {
				part = cloneDeep(value);
			}
		});

		return part;
	}

	public removeItemInListBy_PartNumber(listParts, partNumber) {
		listParts.forEach((value, index) => {
			if (value.partNumber == partNumber) {
				listParts.splice(index, 1);
			}
		});
		return listParts;
	}

	public getListPartCanSelectedInPOL(except) {

		var listPart = cloneDeep(this.dataPODetail.listAvailablePart);
		var listPS = cloneDeep(this.listPartNumberSelected);
		listPS.forEach((value, index) => {
			if (value == except) listPS.splice(index, 1);
		});
		for (let pn of listPS) {
			listPart = this.removeItemInListBy_PartNumber(listPart, pn);
		}

		return listPart;
	}

	public onChangePartNumberOnPOLine(event, indexPOL_In_purchaseOrderLines) {

		var partNumberOnChange = event.target.value;
		var partOnChange = this.getItemInListBy_PartNumber(this.dataPODetail.listAvailablePart, partNumberOnChange);

		var partNumberCurrent = this.dataPODetail.purchaseOrderLines[indexPOL_In_purchaseOrderLines].partNumber;
		var partCurrent = this.getItemInListBy_PartNumber(this.dataPODetail.listAvailablePart, partNumberCurrent);

		// delete partNumber current in List Part Number Selected
		this.listPartNumberSelected.forEach((value, index) => {
			if (value == partNumberCurrent) {
				this.listPartNumberSelected.splice(index, 1);
			}
		});

		// add partNumber On Change to List Part Number Selected
		this.listPartNumberSelected.push(partNumberOnChange);

		// change part in PO Line in PO Detail
		this.changePOLine_In_PODetail(indexPOL_In_purchaseOrderLines, partOnChange);

	}

	public changePOLine_In_PODetail(idPOLine, part) {
		this.dataPODetail.purchaseOrderLines[idPOLine].idPart = part.id;
		this.dataPODetail.purchaseOrderLines[idPOLine].partNumber = part.partNumber;
		this.dataPODetail.purchaseOrderLines[idPOLine].partDescripttion = part.partDescripttion;
		this.dataPODetail.purchaseOrderLines[idPOLine].manufacturer = part.manufacturer;

		this.dataPODetail.purchaseOrderLines[idPOLine].qtyOrdered = 1;
		this.dataPODetail.purchaseOrderLines[idPOLine].orderDate = this.dataPODetail.orderDate;
		this.dataPODetail.purchaseOrderLines[idPOLine].m2BuyPrice = 1;
		this.dataPODetail.purchaseOrderLines[idPOLine].memo = "";

	}

	// Add Purchase Order Line
	public addPurchaseOrderLine() {
		if (this.listPartNumberSelected.length == this.dataPODetail.listAvailablePart.length) {
			alert("Cant Add More Purchase order Line!");
			return;
		}
		var part = this.getListPartCanSelectedInPOL(null)[0];
		var pol = {
			"id": 0,
			"idPurchaseOrder": this.dataPODetail.orderNo,
			"orderDate": this.dataPODetail.orderDate,
			"qtyOrdered": 1,
			"backOrder": true,
			"m2BuyPrice": 1,
			"memo": "",
			"status": true,
			"idPart": part.id,
			"partNumber": part.partNumber,
			"partDescripttion": part.partDescripttion,
			"manufacturer": part.manufacturer
		};

		// add partNumber On Change to List Part Number Selected
		this.listPartNumberSelected.push(part.partNumber);

		this.dataPODetail.purchaseOrderLines.push(pol);
	}

	// delete column POL in PO 
	public deletePurchaseOrderLine(indexPOL) {

		if (this.listPartNumberSelected.length <= 1) {
			alert("Waring: The PO must have at least one PO line!");
			return;
		}

		// delete partNumber current in List Part Number Selected
		this.listPartNumberSelected.forEach((value, index) => {
			if (value == this.dataPODetail.purchaseOrderLines[indexPOL].partNumber) {
				this.listPartNumberSelected.splice(index, 1);
			}
		});

		// delete PO Line
		this.dataPODetail.purchaseOrderLines.splice(indexPOL, 1);

	}


	// Patch : Update Purchase Order Detail
	public pacthUpdatePurchaseOrderDetail() {
		var url = this.domainAPI.getUrlPO() + "/PurchaseOrderDetail/UpdatePurchaseOrderDetail";

		var dataPOST = cloneDeep(this.dataPODetail);
		delete dataPOST.listAvailablePart;

		if (this.dataPODetail.purchaseOrderLines.length == 0) {
			this.alertMessage.createAlertError('The PO must have at least one PO line!', 'all-alert');
			return;
		}

		let body = new FormData();
		body.append("pod", JSON.stringify(dataPOST));

		this.serverHttp.patchAPIWithData(url, body).subscribe((data) => {
			if (data == "Update Success") {
				this.alertMessage.createAlertSuccess(data, 'all-alert');
			} else {
				this.alertMessage.createAlertError(data, 'all-alert');
			}
			
		}, (error) => {

			this.alertMessage.createAlertError(error, 'all-alert');
		});
	}

	// Patch : Cancel Purchase Order
	private cancelPurchaseOrder(index) {

		var url = this.domainAPI.getUrlPO() + "/PurchaseOrderDetail/CancelPurchaseOrderDetail";
		let body = new FormData();
		body.append('id', "" + index);

		this.serverHttp.patchAPIWithData(url, body).subscribe((data) => {
			if (data == "Update Success") {
				this.alertMessage.createAlertSuccess(data, 'all-alert');
				window.location.reload();
			} else {
				this.alertMessage.createAlertError(data, 'all-alert');
			}

		});

	}

	public openModalCancel(content) {
		//console.log("click open modal");
		this.ngbModal.open(content).result.then((result) => {

			this.cancelPurchaseOrder(this.dataPODetail.orderNo);
		}, (reason) => {
			//console.log(this.GetDismissReason(reason));
		});
	}

	private getDismissReason(reason): string {
		if (reason === ModalDismissReasons.ESC) {
			return "click ESC";
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return "Click Back Ground";
		} else {
			return "Reason: " + reason;
		}
	}





}
