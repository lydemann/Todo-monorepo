import { Component, OnInit } from '@angular/core';

import { TodoListFacadeService } from '@todo/todo-app/domain';

@Component({
	selector: 'app-todo-list-completed',
	templateUrl: './todo-list-completed.component.html',
})
export class TodoListCompletedComponent implements OnInit {
	public completedTodos$;

	constructor(private todoListFacadeService: TodoListFacadeService) {}

	public ngOnInit() {
		this.completedTodos$ = this.todoListFacadeService.completedTodos$;
	}

	public todoCompleteToggled(todoId: string) {
		this.todoListFacadeService.todoCompletedToggled(todoId);
	}
}
