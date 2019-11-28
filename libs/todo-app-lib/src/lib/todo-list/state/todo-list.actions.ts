import { createAction, props, union } from '@ngrx/store';

import { TODOItem } from '@todo-app/shared/models/todo-item';

export namespace TodoListActions {
	export const getTodoListRequest = createAction(
		'[TodoList] Get Todo List Request',
	);

	export const getTodoListResponse = createAction(
		'[TodoList] Get Todo List Response',
		props<{ todoList: TODOItem[] }>(),
	);

	export const getTodoListFailed = createAction(
		'[TodoList] Load Todo List Failed',
		props<{ error: Error }>(),
	);

	export const deleteTodoItem = createAction(
		'[TodoList] Delete Todo Item',
		props<{ todoItemId: string }>(),
	);

	export const saveTodoItemRequest = createAction(
		'[TodoList] Save Todo Item Request',
		props<{ todoItem: TODOItem }>(),
	);

	export const addTodoItemRequest = createAction(
		'[TodoList] Add Todo Item Request',
		props<{ todoItem: TODOItem }>(),
	);

	export const addTodoItemReponse = createAction(
		'[TodoList] Add Todo Item Response',
		props<{ todoItem: TODOItem }>(),
	);

	export const addTodoItemFailed = createAction(
		'[TodoList] Add Todo Item Failed',
		props<{ error: Error }>(),
	);

	export const updateTodoItemRequest = createAction(
		'[TodoList] Update Todo Item Request',
		props<{ todoItem: TODOItem }>(),
	);

	export const updateTodoItemResponse = createAction(
		'[TodoList] Update Todo Item Response',
		props<{ todoItem: TODOItem }>(),
	);

	export const updateTodoItemFailed = createAction(
		'[TodoList] Update Todo Item Failed',
		props<{ error: Error }>(),
	);

	export const toggleCompleteTodoItem = createAction(
		'[TodoList] Toggle Complete Todo Item',
		props<{ todoItemId: string }>(),
	);

	export const selectTodoForEdit = createAction(
		'[TodoList] Select Todo For Edit',
		props<{ todoItem: TODOItem }>(),
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
