import {
	ApplicationRef,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { InvalidDateValidator } from '../../form-validation/invalid-date.directive';

@Component({
	selector: 'app-add-todo-reactive-forms',
	templateUrl: './add-todo-reactive-forms.component.html',
	styleUrls: ['./add-todo-reactive-forms.component.scss'],
})
export class AddTodoReactiveFormsComponent implements OnChanges {
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

	constructor(
		private formBuilder: FormBuilder,
		private changeDetectionRef: ChangeDetectorRef,
		private applicationRef: ApplicationRef,
	) {}

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

		this.saveTodo.next({
			...this.addTodoForm.value,
			id: this._currentTODO.id,
		} as TodoItem);
		form.resetForm();
		this.changeDetectionRef.detectChanges();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.changeDetectionRef.detectChanges();
	}

	@HostListener('keyup', ['$event'])
	@HostListener('click', ['$event'])
	@HostListener('change', ['$event'])
	private runCD() {
		this.applicationRef.tick();
		this.changeDetectionRef.detectChanges();
	}
}
