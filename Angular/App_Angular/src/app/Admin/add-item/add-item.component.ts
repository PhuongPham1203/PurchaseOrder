import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/States/app.state';
import { Tutorial } from 'src/app/Models/tutorial.model';
import * as TutorialActions from './../../Actions/tutorial.actions';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	public name:string;

	constructor(
		private store : Store<AppState>

	) { }

	ngOnInit(): void {
		this.SetRandomName();
	}

	public addTutorial(name,url){
		this.store.dispatch(new TutorialActions.AddTutorial({
			name:name,
			url:url
		}))
		this.SetRandomName();


	}

	public SetRandomName(){
		this.name = 'name index: ' + this.GetRandom100();
 
	}

	public GetRandom100(){
		return Math.round(Math.random()*100);
	}
}
