import { TODOItem } from '@todo-app/shared/models/todo-item';

export interface TodoListState {
  todos: TODOItem[];
  selectedTodoItemId?: string;
  errors?: Error;
  isLoading: boolean;
}
