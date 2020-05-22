import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { InvalidDateValidator } from '@todo-app/shared/invalid-date.directive';
import { TodoItem } from '@todo/shared/todo-interfaces';

@Component({
	selector: 'app-add-todo-reactive-forms',
	templateUrl: './add-todo-reactive-forms.component.html',
	styleUrls: ['./add-todo-reactive-forms.component.scss'],
})
export class AddTodoReactiveFormsComponent {
	@Input() public headlineText = 'add-todo.headline';
	@Input() public dueDateText = 'add-todo.due-date';
	@Input() public createText = 'add-todo.create';
	@Input() public saveText = 'add-todo.save';

	public addTodoForm = this.formBuilder.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		dueDate: ['', [Validators.required, InvalidDateValidator]],
	});
	@Input()
	public isSavingTodo: boolean;
	@Output() public saveTodo = new EventEmitter<TodoItem>();

	private _currentTODO = new TodoItem('', '');

	constructor(private formBuilder: FormBuilder) {}
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

	public save(form: NgForm) {
		if (!form.valid) {
			// tslint:disable-next-line: no-console
			console.error('Invalid form!');
			return;
		}

		this.saveTodo.next(this.addTodoForm.value);
		form.resetForm();
	}
}
