import { TODOItem } from '@todo-app/shared/models/todo-item';
import { DuedateTodayCountPipe } from './duedate-today-count.pipe';

describe('DuedateTodayCountPipe', () => {
	describe('transform', () => {
		it('have two task that are due today', () => {
			const pipe = new DuedateTodayCountPipe();
			const todos = [
				new TODOItem('', '', new Date().toISOString().slice(0, 10)),
				new TODOItem('', '', new Date().toISOString().slice(0, 10)),
				new TODOItem('', ''),
			];
			const res = pipe.transform(todos);
			expect(res).toBe(2);
		});
	});
});
