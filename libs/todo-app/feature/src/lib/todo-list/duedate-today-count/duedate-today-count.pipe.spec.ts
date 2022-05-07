import { TodoItem } from '@todo/shared/todo-interfaces';
import { DuedateTodayCountPipe } from './duedate-today-count.pipe';

describe('DuedateTodayCountPipe', () => {
	describe('transform', () => {
		it('have two task that are due today', () => {
			const pipe = new DuedateTodayCountPipe();
			const todos = [
				new TodoItem('', '', new Date().toISOString().slice(0, 10)),
				new TodoItem('', '', new Date().toISOString().slice(0, 10)),
				new TodoItem('', ''),
			];
			const res = pipe.transform(todos);
			expect(res).toBe(2);
		});
	});
});
