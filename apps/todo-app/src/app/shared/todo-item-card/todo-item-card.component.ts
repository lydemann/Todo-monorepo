import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoItem } from '@todo/shared/todo-interfaces';

@Component({
	selector: 'app-todo-item-card',
	templateUrl: './todo-item-card.component.html',
	styleUrls: ['./todo-item-card.component.scss'],
})
export class TodoItemCardComponent {
	@Input() public todoItem: TodoItem;
	@Input() public readOnlyTODO: boolean;
	@Output() public todoDelete = new EventEmitter();
	@Output() public todoEdit = new EventEmitter();
	@Output() public todoCompleteToggled = new EventEmitter<string>();

	public completeClick() {
		this.todoCompleteToggled.emit(this.todoItem.id);
	}

	public deleteClick() {
		this.todoDelete.emit(this.todoItem.id);
	}

	public editClick() {
		this.todoEdit.emit(this.todoItem);
	}
}
