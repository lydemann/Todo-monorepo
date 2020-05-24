import {
	ApplicationRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core';

import { TodoItem } from '@todo/shared/todo-interfaces';

@Component({
	selector: 'app-crud-item',
	templateUrl: './crud-item.component.html',
	styleUrls: ['./crud-item.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class CrudItemComponent {
	@Input() public todoItem: TodoItem;
	@Input() public isReadOnly: boolean;
	@Input() public dueDateText: string = 'add-todo.due-date';
	@Input() public completeBtnText: string = 'todo-item.complete';
	@Input() public editBtnText: string = 'todo-item.edit';
	@Input() public deleteBtnText: string = 'todo-item.delete';

	@Output() public todoDelete = new EventEmitter();
	@Output() public todoEdit = new EventEmitter();
	@Output() public todoCompleteToggled = new EventEmitter<string>();

	constructor(private applicationRef: ApplicationRef) {}

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
