/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';

import { HardcodedQuestionService } from './hardcoded-questions.service';

describe('Service: HardcodedQuestion', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [HardcodedQuestionService],
		});
	});

	it('should ...', inject(
		[HardcodedQuestionService],
		(service: HardcodedQuestionService) => {
			expect(service).toBeTruthy();
		},
	));
});
