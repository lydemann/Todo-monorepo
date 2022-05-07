import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { TodoItem } from '@todo/shared/todo-interfaces';

export const todoListAdapter: EntityAdapter<TodoItem> =
	createEntityAdapter<TodoItem>({
		selectId: state => state.id,
	});

export interface TodoListState extends EntityState<TodoItem> {
	selectedTodoItemId: string;
	error: Error;
	isLoading: boolean;
	isAddingTodo: boolean;
}

export const todoListInitState = todoListAdapter.getInitialState<TodoListState>(
	{
		entities: {},
		ids: [],
		error: null,
		selectedTodoItemId: null,
		isLoading: false,
		isAddingTodo: false,
	},
);
