import { waitForAsync, TestBed } from '@angular/core/testing';

import { TodoAppLibModule } from './todo-app-lib.module';

describe('TodoAppLibModule', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [TodoAppLibModule],
		}).compileComponents();
	}));

	it('should create', () => {
		expect(TodoAppLibModule).toBeDefined();
	});
});
