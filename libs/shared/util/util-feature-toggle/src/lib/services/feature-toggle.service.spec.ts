import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { SpyObject, createSpyObject } from '@ngneat/spectator/jest';
import { FeatureToggleService } from './feature-toggle.service';

describe('FeatureToggleService', () => {
	let service: FeatureToggleService;
	let httpService: SpyObject<HttpClient>;

	beforeEach(() => {
		httpService = createSpyObject(HttpClient);
		service = new FeatureToggleService(httpService);
	});

	describe('getFeatureFlags', () => {
		it('should get feature flags', done => {
			httpService.get.andReturn(of({ 'completed-todos': true }));

			service
				.getFeatureFlags('someId')
				.pipe(first())
				.subscribe(_ => {
					const res = service.hasFlags('completed-todos');
					expect(res).toBe(true);
					done();
				});
		});
	});
});
