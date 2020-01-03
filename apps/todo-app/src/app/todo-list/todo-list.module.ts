import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@todo-app/shared/shared.module';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import { AddTodoReactiveFormsModule } from './add-todo-reactive-forms/add-todo-reactive-forms.module';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		SharedModule,
		AddTodoReactiveFormsModule,
	],
	declarations: [TodoListComponent, DuedateTodayCountPipe],
})
export class TodoListModule {}
