import { TestBed, waitForAsync } from '@angular/core/testing';

import { SharedUtilModule } from './shared-util.module';

describe('SharedUtilModule', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [SharedUtilModule],
		}).compileComponents();
	}));

	it('should create', () => {
		expect(SharedUtilModule).toBeDefined();
	});
});
