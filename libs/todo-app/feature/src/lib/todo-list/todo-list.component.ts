import { Component } from '@angular/core';

import { CrudItemComponent } from '@todo-app/ui';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { SharedModule } from '../shared/shared.module';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';

@Component({
	selector: 'app-todo-list',
	template: `@if (this.isLoading() === false) {
			<div class="todo-list-wrapper">
				<div class="mx-auto col-10">
					<h5>{{ 'todo-list' | translate }}</h5>
					dfdfdfdf
					<hr />
					<app-cards-list
						[tableRef]="todoListRef"
						[cardRef]="todoItemCardRef"
						[data]="todoList()"
					></app-cards-list>

					<hr />
					<div>
						{{ 'todo-list-section.todos-duedate-today' | translate }}:
						{{ todoList() | duedateTodayCount }}
					</div>
					<hr />
					<app-add-todo-reactive-forms
						[currentTodo]="selectedTodo$ | async"
						[isSavingTodo]="isSavingTodo$ | async"
						(saveTodo)="onSaveTodo($event)"
					></app-add-todo-reactive-forms>
				</div>
			</div>
		} @else {
			<app-spinner [message]="'Getting todo items'"></app-spinner>
		}

		<ng-template #todoItemCardRef let-todo="data">
			<app-todo-item-card
				[todoItem]="todo"
				(todoDelete)="deleteTodo($event)"
				(todoEdit)="selectTodoForEdit($event)"
				(todoCompleteToggled)="todoCompleteToggled($event)"
			></app-todo-item-card>
		</ng-template>

		<ng-template #todoListRef let-todos="data">
			<ul class="list-group mb-3">
				@for (todo of todos; track todo.id) {
					<app-crud-item
						[todoItem]="todo"
						(todoDelete)="deleteTodo($event)"
						(todoEdit)="selectTodoForEdit($event)"
						(todoCompleteToggled)="todoCompleteToggled($event)"
					></app-crud-item>
				}
			</ul>
		</ng-template>`,
	standalone: true,
	imports: [SharedModule, DuedateTodayCountPipe, CrudItemComponent],
})
export class TodoListComponent {
	public selectedTodo$ = this.todoListFacadeService.selectedTodo$;
	public todoList = this.todoListFacadeService.todoList;
	public isLoading = this.todoListFacadeService.isLoading;
	public isSavingTodo$ = this.todoListFacadeService.isSavingTodo$;

	constructor(private todoListFacadeService: TodoListFacadeService) {}

	public deleteTodo(id: string) {
		this.todoListFacadeService.deleteTodo(id);
	}

	public selectTodoForEdit(todoItem: TodoItem) {
		this.todoListFacadeService.selectTodoForEdit(todoItem);
	}

	public onSaveTodo(todoItem: TodoItem) {
		this.todoListFacadeService.saveTodoItem(todoItem);
	}

	public todoCompleteToggled(todoId: string) {
		this.todoListFacadeService.todoCompletedToggled(todoId);
	}
	private isToday(todoDate) {
		let newTodoDate = todoDate;
		if (typeof todoDate === 'string') {
			newTodoDate = new Date(todoDate);
		}

		const today = new Date();
		return (
			newTodoDate.getDate() === today.getDate() &&
			newTodoDate.getMonth() === today.getMonth() &&
			newTodoDate.getFullYear() === today.getFullYear()
		);
	}
}
