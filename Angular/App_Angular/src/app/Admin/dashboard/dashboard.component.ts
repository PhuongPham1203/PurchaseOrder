import { Component, OnInit } from '@angular/core';
import { AuthDashboardService } from 'src/app/Services/Admin/auth-dashboard.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public auth = null;

	constructor(private authServices:AuthDashboardService) { }

	ngOnInit(): void {
		this.authServices.authData$.subscribe(data=>this.auth = data);
	}

	

}
