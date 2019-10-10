import { inject, TestBed } from '@angular/core/testing';

import { EndpointsService } from './endpoints.service';

describe('Service: Endpoints', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EndpointsService],
		});
	});

	it('should ...', inject([EndpointsService], (service: EndpointsService) => {
		expect(service).toBeTruthy();
	}));
});
