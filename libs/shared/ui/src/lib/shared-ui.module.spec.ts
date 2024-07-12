import { waitForAsync, TestBed } from '@angular/core/testing';

import { SharedUiModule } from './shared-ui.module';

describe('SharedUiModule', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [SharedUiModule],
		}).compileComponents();
	}));

	it('should create', () => {
		expect(SharedUiModule).toBeDefined();
	});
});
