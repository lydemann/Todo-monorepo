import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoItem } from '@todo/shared/todo-interfaces';

@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['add-todo.component.scss'],
})
export class AddTodoComponent {
	@Input() public isSavingTodo: boolean;

	@Output() public saveTodoItem = new EventEmitter<TodoItem>();

	private _currentTODO = new TodoItem('', '');

	public get currentTodo(): TodoItem {
		return this._currentTODO;
	}
	@Input()
	public set currentTodo(todoItem: TodoItem) {
		this._currentTODO = { ...todoItem };
	}

	public save(form: NgForm) {
		if (!form.valid) {
			// tslint:disable-next-line: no-console
			console.error('Invalid form!');
			return;
		}
		this.saveTodoItem.next(this.currentTodo);
		form.resetForm();
	}
}
