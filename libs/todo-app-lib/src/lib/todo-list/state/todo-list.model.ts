import { TodoItem } from '@todo/shared/todo-interfaces';

export interface TodoListState {
	todos: TodoItem[];
	selectedTodoItemId?: string;
	errors?: Error;
	isLoading: boolean;
	isSavingTodo: boolean;
}
