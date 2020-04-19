import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['add-todo.component.scss'],
})
export class AddTodoComponent {
	public isSavingTodo$ = this.todoListSandboxService.isSavingTodo$;

	private _currentTODO = new TodoItem('', '');
	public get currentTodo(): TodoItem {
		return this._currentTODO;
	}
	@Input()
	public set currentTodo(todoItem: TodoItem) {
		this._currentTODO = { ...todoItem };
	}

	constructor(private todoListSandboxService: TodoListSandboxService) {}

	public save(form: NgForm) {
		if (!form.valid) {
			// tslint:disable-next-line: no-console
			console.error('Invalid form!');
			return;
		}
		this.todoListSandboxService.saveTodoItem(this.currentTodo);
		form.resetForm();
	}
}
