import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { CrudItemComponent } from './crud-item.component';

@Component({
	selector: 'app-crud-item',
	template: '',
})
// tslint:disable-next-line:component-class-suffix
export class MockCrudItemComponent {
	@Input() public dueDateText: string;
	@Input() public completeBtnText: string;
	@Input() public editBtnText: string;
	@Input() public deleteBtnText: string;
	@Input() public todoItem: TodoItem;
	@Input() public isReadOnly: boolean;
	@Output() public todoDelete = new EventEmitter();
	@Output() public todoEdit = new EventEmitter();
	@Output() public todoCompleteToggled: EventEmitter<string>;

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
