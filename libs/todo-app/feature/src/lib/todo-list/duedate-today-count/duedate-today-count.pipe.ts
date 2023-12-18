/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pipe, PipeTransform } from '@angular/core';

import { TodoItem } from '@todo/shared/todo-interfaces';

@Pipe({
	name: 'duedateTodayCount',
	standalone: true,
})
export class DuedateTodayCountPipe implements PipeTransform {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public transform(todoItems: TodoItem[], args?: any): any {
		return todoItems.filter(todo => this.isToday(new Date(todo.dueDate)))
			.length;
	}

	private isToday(someDate) {
		const today = new Date();
		return (
			someDate.getDate() === today.getDate() &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		);
	}
}
