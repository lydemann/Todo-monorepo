import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoListEffects } from './redux-api/todo-list.effects';
import { todoListReducers } from './redux-api/todo-list.reducers';
import { TodoListSelector } from './redux-api/todo-list.selector';

@NgModule({
  imports: [
    StoreModule.forFeature('todoList', todoListReducers),
    EffectsModule.forFeature([TodoListEffects])
  ],
  providers: [TodoListSelector]
})
export class TodoListSandboxModule {}
