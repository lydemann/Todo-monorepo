import { Component, Input } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { InvalidDateValidator } from '@todo-app/shared/invalid-date.directive';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-add-todo-reactive-forms',
	templateUrl: './add-todo-reactive-forms.component.html',
	styleUrls: ['./add-todo-reactive-forms.component.scss'],
})
export class AddTodoReactiveFormsComponent {
	public addTodoForm = this.formBuilder.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		dueDate: ['', [Validators.required, InvalidDateValidator]],
	});
	@Input()
	public set currentTodo(todoItem: TodoItem) {
		this._currentTODO = { ...todoItem };
		this.addTodoForm.patchValue({
			...todoItem,
		});
	}
	public get currentTodo(): TodoItem {
		return this._currentTODO;
	}
	public isSavingTodo$ = this.todoListSandboxService.isSavingTodo$;

	private _currentTODO = new TodoItem('', '');

	constructor(
		private todoListSandboxService: TodoListSandboxService,
		private formBuilder: FormBuilder,
	) {}

	public save(form: NgForm) {
		if (!form.valid) {
			// tslint:disable-next-line: no-console
			console.error('Invalid form!');
			return;
		}

		this.todoListSandboxService.saveTodoItem(this.addTodoForm.value);
		form.resetForm();
	}
}
