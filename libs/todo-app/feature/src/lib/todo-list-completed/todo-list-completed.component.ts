import { Component } from '@angular/core';

import { TodoListFacadeService } from '@todo/todo-app/domain';
import { SharedModule } from '../shared/shared.module';

@Component({
	selector: 'app-todo-list-completed',
	template: `
		<div class="todo-list-wrapper">
			<div class="mx-auto col-10">
				<h5>{{ 'completed-todo-list' | translate }}</h5>
				<hr />
				<ul class="list-group mb-3">
					<app-crud-item
						*ngFor="let todo of completedTodos()"
						(todoCompleteToggled)="todoCompleteToggled($event)"
						[todoItem]="todo"
						[isReadOnly]="true"
					></app-crud-item>
				</ul>
			</div>
			<hr />
		</div>
	`,
	imports: [SharedModule],
})
export class TodoListCompletedComponent {
	completedTodos = this.todoListFacadeService.completedTodos;

	constructor(private todoListFacadeService: TodoListFacadeService) {}

	public todoCompleteToggled(todoId: string) {
		this.todoListFacadeService.todoCompletedToggled(todoId);
	}
}
