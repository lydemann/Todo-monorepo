import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoItemCardComponent } from './todo-item-card.component';

@Component({
	selector: 'app-todo-item-card',
	template: '',
})
// tslint:disable-next-line:component-class-suffix
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TodoItemCardComponentMock implements TodoItemCardComponent {
	public todoCompleteToggled: EventEmitter<string>;
	@Input() public todoItem: TodoItem;
	@Input() public readOnlyTODO: boolean;
	@Output() public todoDelete = new EventEmitter();
	@Output() public todoEdit = new EventEmitter();

	public completeClick() {
		this.todoItem.completed = !this.todoItem.completed;
	}

	public deleteClick() {
		this.todoDelete.emit(this.todoItem.id);
	}

	public editClick() {
		this.todoEdit.emit(this.todoItem);
	}
}
