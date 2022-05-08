import { Component, OnInit } from '@angular/core';
import { TodoItem } from '@todo/shared/todo-interfaces';

import { TodoListFacadeService } from '@todo/todo-app/domain';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-todo-list-completed',
	templateUrl: './todo-list-completed.component.html',
})
export class TodoListCompletedComponent implements OnInit {
	public completedTodos$!: Observable<TodoItem[]>;

	constructor(private todoListFacadeService: TodoListFacadeService) {}

	public ngOnInit() {
		this.completedTodos$ = this.todoListFacadeService.completedTodos$;
	}

	public todoCompleteToggled(todoId: string) {
		this.todoListFacadeService.todoCompletedToggled(todoId);
	}
}
