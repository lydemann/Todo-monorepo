import { TODOItem } from '@todo-app/shared/models/todo-item';
import { ImmutableCollectionHelper } from '@todo/shared/utils';
import { GenericAction } from '../../generic-action';
import { TodoListActionTypes } from './todo-list.actions';
import { TodoListState } from './todo-list.model';

export const todoListInitState: TodoListState = {
  todos: [],
  isLoading: false
};

const loadTodoItems = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, void>
): TodoListState => {
  return {
    ...lastState,
    isLoading: true
  };
};

const todoItemsLoaded = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem[]>
): TodoListState => {
  return {
    ...lastState,
    todos: action.payload,
    isLoading: false
  };
};

const todoItemsLoadFailed = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, Error>
): TodoListState => {
  return {
    ...lastState,
    errors: action.payload,
    isLoading: false
  };
};

const todoItemCreatedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const prevTodos = lastState.todos;
  prevTodos.push(action.payload);
  const newTodos = prevTodos;
  return {
    ...lastState,
    todos: newTodos
  };
};
const todoItemDeletedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, string>
): TodoListState => {
  const deleteIdx = lastState.todos.findIndex((todo) => todo.id === action.payload);

  lastState.todos.splice(deleteIdx, 1);

  return { ...lastState };
};
const todoItemUpdatedReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const updatedTodoIdx = lastState.todos.findIndex((todo) => todo.id === action.payload.id);
  lastState.todos[updatedTodoIdx] = action.payload;
  return { ...lastState };
};
const toggleTodoItemReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, string>
): TodoListState => {
  const index = lastState.todos.findIndex((todo) => todo.id === action.payload);
  const oldTodo = lastState.todos[index];
  const newTodo = {
    ...oldTodo,
    completed: !oldTodo.completed
  };
  const newTodos = ImmutableCollectionHelper.updateObjectInArray(lastState.todos, index, newTodo);

  return { ...lastState, todos: newTodos };
};

const selectTodoForEditAReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, string>
): TodoListState => {
  return { ...lastState, selectedTodoItemId: action.payload };
};

export function todoListReducers(
  lastState: TodoListState = todoListInitState,
  action: GenericAction<TodoListActionTypes, any>
): TodoListState {
  switch (action.type) {
    case TodoListActionTypes.LoadTodoList:
      return loadTodoItems(lastState, action);
    case TodoListActionTypes.LoadTodoListSuccess:
      return todoItemsLoaded(lastState, action);
    case TodoListActionTypes.LoadTodoListFailed:
      return todoItemsLoadFailed(lastState, action);
    case TodoListActionTypes.AddTodoItemSuccess:
      return todoItemCreatedReducer(lastState, action);
    case TodoListActionTypes.LoadTodoListFailed:
      return todoItemsLoadFailed(lastState, action);
    case TodoListActionTypes.DeleteTodoItem:
      return todoItemDeletedReducer(lastState, action);
    case TodoListActionTypes.UpdateTodoItem:
      return todoItemUpdatedReducer(lastState, action);
    case TodoListActionTypes.ToggleCompleteTodoItem:
      return toggleTodoItemReducer(lastState, action);
    case TodoListActionTypes.SelectTodoForEdit:
      return selectTodoForEditAReducer(lastState, action);

    default:
      return lastState;
  }
}
