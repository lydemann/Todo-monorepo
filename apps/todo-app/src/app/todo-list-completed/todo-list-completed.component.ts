import { Component } from '@angular/core';

import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-todo-list-completed',
	templateUrl: './todo-list-completed.component.html',
})
export class TodoListCompletedComponent {
	public completedTodos$ = this.todoListSandboxService.completedTodos$;

	constructor(private todoListSandboxService: TodoListSandboxService) {}
}
