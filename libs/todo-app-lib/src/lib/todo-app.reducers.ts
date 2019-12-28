import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@todo-app/environments/environment';
import { AppState } from './app-state';
import { todoListReducers } from './todo-list/state/todo-list.reducers';

export const todoAppReducers: ActionReducerMap<any> = {
	todoList: todoListReducers,
	router: routerReducer,
};

export function getMetaReducers(): Array<MetaReducer<AppState>> {
	if (!environment.production) {
		// tslint:disable-next-line: no-console
		console.log('Store freeze is enabled');
		return [storeFreeze];
	}
	return [];
}
