import { NgModule } from '@angular/core';
import { TodoListSelector } from './redux-api/todo-list.selector';

@NgModule({
  providers: [TodoListSelector]
})
export class TodoListSandboxModule {}
