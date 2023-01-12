import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-add-todo',
	template: '',
})
export class MockAddTodoComponent {
	public isLoading = false;

	@Input()
	public currentTodo;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public save() {}
}
