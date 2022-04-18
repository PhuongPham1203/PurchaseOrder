import { Action } from "@ngrx/store";
import { Tutorial } from "../Models/tutorial.model"
import * as TutorialActions from '../Actions/tutorial.actions'

const initalState: Tutorial = {
	name: 'Initial Tutorial',
	url: 'https://google.com'
}

export function reducer(state: Tutorial[] = [initalState], action: TutorialActions.Actions) {
	switch (action.type) {
		case TutorialActions.ADD_TUTORIAL:
			return [...state, action.payload];
		case TutorialActions.REMOVE_TUTORIAL:
			state = [...state]
			state.splice(action.payload,1);
			return state;
		default:
			return state;
	}
}