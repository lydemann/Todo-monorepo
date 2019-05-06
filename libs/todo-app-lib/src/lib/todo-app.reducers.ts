import { ActionReducerMap } from '@ngrx/store';
import { todoListReducers } from './todo-list/state/todo-list.reducers';

export const todoAppReducers: ActionReducerMap<any> = {
  todoList: todoListReducers
};

// export function getMetaReducers(): Array<MetaReducer<IAppState>> {
//   if (!environment.production) {
//     // tslint:disable-next-line: no-console
//     console.log('Store freeze is enabled');
//     return [storeFreeze];
//   }
//   return [];
// }
