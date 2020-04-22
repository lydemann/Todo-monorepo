import { Injectable } from '@angular/core';

import { FeatureStoreAnonymizer } from '@todo/shared/data-access-logging';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { AppState } from '../../app-state';
import { TodoListState } from './todo-list.model';

@Injectable()
export class TodoListAnonymizer extends FeatureStoreAnonymizer<
	TodoListState,
	AppState
> {
	public getFeatureStateName(): keyof AppState {
		return 'todoList';
	}

	public anonymizeFeatureState(featureState: TodoListState) {
		featureState.todos = featureState.todos.map(
			todo => ({ ...todo, title: '', description: '' } as TodoItem),
		);
	}
}
