import { createAction, props, union } from '@ngrx/store';

import {
	createErrorAction,
	errorProps,
} from '@todo/shared/data-access-logging';
import { TodoItem } from '@todo/shared/todo-interfaces';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TodoListActions {
	export const getTodoListRequest = createAction(
		'[TodoList] Get Todo List Request',
	);

	export const getTodoListResponse = createAction(
		'[TodoList] Get Todo List Response',
		props<{ todoList: TodoItem[] }>(),
	);

	export const getTodoListFailed = createErrorAction(
		'[TodoList] Load Todo List Failed',
		errorProps<{ error: Error }>(),
	);

	export const deleteTodoItem = createAction(
		'[TodoList] Delete Todo Item',
		props<{ todoItemId: string }>(),
	);

	export const saveTodoItemRequest = createAction(
		'[TodoList] Save Todo Item Request',
		props<{ todoItem: TodoItem }>(),
	);

	export const addTodoItemRequest = createAction(
		'[TodoList] Add Todo Item Request',
		props<{ todoItem: TodoItem }>(),
	);

	export const addTodoItemReponse = createAction(
		'[TodoList] Add Todo Item Response',
		props<{ todoItem: TodoItem }>(),
	);

	export const addTodoItemFailed = createErrorAction(
		'[TodoList] Add Todo Item Failed',
		errorProps<{ error: Error }>(),
	);

	export const updateTodoItemRequest = createAction(
		'[TodoList] Update Todo Item Request',
		props<{ todoItem: TodoItem }>(),
	);

	export const updateTodoItemResponse = createAction(
		'[TodoList] Update Todo Item Response',
		props<{ todoItem: TodoItem }>(),
	);

	export const updateTodoItemFailed = createErrorAction(
		'[TodoList] Update Todo Item Failed',
		errorProps<{ error: Error }>(),
	);

	export const toggleCompleteTodoItem = createAction(
		'[TodoList] Toggle Complete Todo Item',
		props<{ todoItemId: string }>(),
	);

	export const selectTodoForEdit = createAction(
		'[TodoList] Select Todo For Edit',
		props<{ todoItem: TodoItem }>(),
	);

	export const all = union({
		getTodoListRequestAction: getTodoListRequest,
		getTodoListResponseAction: getTodoListResponse,
		getTodoListFailAction: getTodoListFailed,
		addTodoItemReponseAction: addTodoItemReponse,
		deleteTodoItemAction: deleteTodoItem,
		saveTodoItemRequestAction: saveTodoItemRequest,
		updateTodoItemResponseAction: updateTodoItemResponse,
		toggleCompleteTodoItemAction: toggleCompleteTodoItem,
		selectTodoForEditAction: selectTodoForEdit,
	});
}

export type TodoListActionsUnion = typeof TodoListActions.all;
