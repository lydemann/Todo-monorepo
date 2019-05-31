import { TODOItem } from '@todo-app/shared/models/todo-item';
import { ImmutableCollectionHelper } from '@todo/shared/utils';
import { GenericAction } from '../../generic-action';
import { TodoListActions, TodoListActionTypes } from './todo-list.actions';
import { TodoListState } from './todo-list.model';

export const todoListInitState: TodoListState = {
  todos: [],
  isLoading: false
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

const AddTodoItemSuccessReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const newTodos = [...lastState.todos, { ...action.payload }];
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
  const newTodos = ImmutableCollectionHelper.removeItem(lastState.todos, deleteIdx);

  return { ...lastState, todos: newTodos };
};
const UpdateTodoItemReducer = (
  lastState: TodoListState,
  action: GenericAction<TodoListActionTypes, TODOItem>
): TodoListState => {
  const updatedTodoIdx = lastState.todos.findIndex((todo) => todo.id === action.payload.id);

  const newTodos = ImmutableCollectionHelper.updateObjectInArray(
    lastState.todos,
    updatedTodoIdx,
    action.payload
  );

  return { ...lastState, todos: newTodos, selectedTodoItemId: null };
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
  action: TodoListActions
): TodoListState {
  switch (action.type) {
    case TodoListActionTypes.LoadTodoList: {
      return {
        ...lastState,
        isLoading: true
      };
    }
    case TodoListActionTypes.LoadTodoListSuccess: {
      return {
        ...lastState,
        todos: action.payload,
        isLoading: false
      };
    }
    case TodoListActionTypes.LoadTodoListFailed:
      return todoItemsLoadFailed(lastState, action);
    case TodoListActionTypes.AddTodoItemSuccess:
      return AddTodoItemSuccessReducer(lastState, action);
    case TodoListActionTypes.LoadTodoListFailed:
      return todoItemsLoadFailed(lastState, action);
    case TodoListActionTypes.DeleteTodoItem:
      return todoItemDeletedReducer(lastState, action);
    case TodoListActionTypes.UpdateTodoItem:
      return UpdateTodoItemReducer(lastState, action);
    case TodoListActionTypes.ToggleCompleteTodoItem:
      return toggleTodoItemReducer(lastState, action);
    case TodoListActionTypes.SelectTodoForEdit:
      return selectTodoForEditAReducer(lastState, action);

    default:
      return lastState;
  }
}

// TODO: add store freeze meta reducer
