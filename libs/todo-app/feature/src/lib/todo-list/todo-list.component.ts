import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { SharedModule } from '../shared/shared.module';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	standalone: true,
	imports: [SharedModule, DuedateTodayCountPipe],
})
export class TodoListComponent {
	public selectedTodo$ = this.todoListFacadeService.selectedTodo$;
	public todoList$ = this.todoListFacadeService.todoList$;
	public isLoading$ = this.todoListFacadeService.isLoading$;
	public isSavingTodo$ = this.todoListFacadeService.isSavingTodo$;
	public duedateTodayCount$ = this.todoList$.pipe(
		map(
			todoList =>
				todoList.filter(
					todoItem => todoItem.dueDate && this.isToday(todoItem.dueDate),
				).length,
		),
	);

	constructor(private todoListFacadeService: TodoListFacadeService) { }

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
