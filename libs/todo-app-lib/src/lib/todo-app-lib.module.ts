import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { todoAppReducers } from './todo-app.reducers';
import { TodoListEffects } from './todo-list/redux-api/todo-list.effects';
import { TodoListSandboxModule } from './todo-list/todo-list-sandbox.module';

@NgModule({
  imports: [
    TodoListSandboxModule,
    StoreModule.forRoot(todoAppReducers),
    EffectsModule.forRoot([TodoListEffects])
  ]
})
export class TodoAppLibModule {}
