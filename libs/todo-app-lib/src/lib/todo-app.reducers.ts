import { ActionReducerMap } from '@ngrx/store';
import { todoListReducers } from './todo-list/state/todo-list.reducers';

export const todoAppReducers: ActionReducerMap<any> = {
  todoList: todoListReducers
};
