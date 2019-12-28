import { RouterReducerState } from '@ngrx/router-store';

import { RouterState } from './router.serilization';
import { TodoListState } from './todo-list/state/todo-list.model';

export interface AppState {
	todoList: TodoListState;
	router: RouterReducerState<RouterState>;
}
