import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-admin-manage',
	templateUrl: './admin-manage.component.html',
	styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {

	constructor(
		private activateRoute:ActivatedRoute
	) { }

	ngOnInit(): void {
		console.log(this.activateRoute.snapshot.data);
	}

}
