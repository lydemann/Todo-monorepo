import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
	public selectedTodo$ = this.todoListSandboxService.selectedTodo$;
	public todoList$ = this.todoListSandboxService.todoList$;
	public isLoading$ = this.todoListSandboxService.isLoading$;
	public duedateTodayCount$ = this.todoList$.pipe(
		map(
			todoList =>
				todoList.filter(
					todoItem => todoItem.dueDate && this.isToday(todoItem.dueDate),
				).length,
		),
	);

	constructor(private todoListSandboxService: TodoListSandboxService) {}

	public deleteTodo(id: string) {
		this.todoListSandboxService.deleteTodo(id);
	}

	public selectTodoForEdit(todoItem: TodoItem) {
		this.todoListSandboxService.selectTodoForEdit(todoItem);
	}

	public todoCompleteToggled(todoId: string) {
		this.todoListSandboxService.todoCompletedToggled(todoId);
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
