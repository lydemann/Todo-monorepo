import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	Component,
	Input,
	ViewEncapsulation,
	output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedUtilUtilI18nModule } from '@todo/shared/util-i18n';

import { TodoItem } from '@todo/shared/todo-interfaces';

@Component({
	selector: 'app-crud-item',
	template: `
		<div class="todo-item" *ngIf="todoItem">
			<li
				class="list-group-item d-flex justify-content-between lh-condensed theme-background"
				data-testid="todo-item"
				[ngClass]="todoItem.completed ? 'bg-completed' : ''"
			>
				<div class="item-content">
					<slot #projectedContent></slot>
					<ng-container *ngIf="!projectedContent.innerHTML.trim()">
						<h6 class="my-0">{{ todoItem.title }}</h6>
						<small class="text-muted">{{ todoItem.description }}</small>
						<div *ngIf="todoItem.dueDate">
							<small
								>{{ dueDateText | translate }}:
								<b>{{ todoItem.dueDate | localDate }}</b>
							</small>
						</div>
					</ng-container>
				</div>

				<div class="align-right btn-group-vertical">
					<button
						(click)="completeClick()"
						type="button"
						class="btn btn-success"
						aria-label="Edit"
					>
						{{ completeBtnText | translate }}
					</button>
					<button
						*ngIf="!isReadOnly"
						(click)="editClick()"
						type="button"
						class="btn btn-info"
						aria-label="Edit"
						data-testid="edit-button"
					>
						{{ editBtnText | translate }}
					</button>
					<button
						*ngIf="!isReadOnly"
						(click)="deleteClick()"
						type="button"
						class="btn btn-danger"
						aria-label="Delete"
						data-testid="delete-button"
					>
						{{ deleteBtnText | translate }}
					</button>
				</div>
			</li>
		</div>
	`,
	styleUrls: ['./crud-item.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
	imports: [CommonModule, TranslateModule, SharedUtilUtilI18nModule],
})
export class CrudItemComponent {
	@Input() public todoItem: TodoItem;
	@Input() public isReadOnly: boolean;
	@Input() public dueDateText = 'add-todo.due-date';
	@Input() public completeBtnText = 'todo-item.complete';
	@Input() public editBtnText = 'todo-item.edit';
	@Input() public deleteBtnText = 'todo-item.delete';

	todoDelete = output<string>();
	todoEdit = output<TodoItem>();
	todoCompleteToggled = output<string>();

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
