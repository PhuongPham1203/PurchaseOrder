import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

	public color : ThemePalette = 'primary';
	public mode: ProgressSpinnerMode = 'determinate';
	public value = 40;
	constructor() { }

	ngOnInit(): void {
	}

	private changeBar(afterTime:number) {
		
	}

}
