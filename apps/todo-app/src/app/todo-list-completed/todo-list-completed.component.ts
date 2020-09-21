import { Component, OnInit } from '@angular/core';

import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-todo-list-completed',
	templateUrl: './todo-list-completed.component.html',
})
export class TodoListCompletedComponent implements OnInit {
	public completedTodos$;

	constructor(private todoListSandboxService: TodoListSandboxService) {}

	public ngOnInit() {
		this.completedTodos$ = this.todoListSandboxService.completedTodos$;
	}

	public todoCompleteToggled(todoId: string) {
		this.todoListSandboxService.todoCompletedToggled(todoId);
	}
}
