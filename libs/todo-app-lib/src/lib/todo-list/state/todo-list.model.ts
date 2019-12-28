import { TodoItem } from '@todo-app/shared/models/todo-item';

export interface TodoListState {
	todos: TodoItem[];
	selectedTodoItemId?: string;
	errors?: Error;
	isLoading: boolean;
}
