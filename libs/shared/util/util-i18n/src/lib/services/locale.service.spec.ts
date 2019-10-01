import { inject, TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';

describe('Service: Locale', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LocaleService],
		});
	});

	it('should ...', inject([LocaleService], (service: LocaleService) => {
		expect(service).toBeTruthy();
	}));
});
