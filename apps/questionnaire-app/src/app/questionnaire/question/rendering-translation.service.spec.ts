import { TestBed } from '@angular/core/testing';

import { AnswerOption, Question } from '../../questionnaire.model';
import {
	comboboxOptionsThreshold,
	RenderingTranslationService,
} from './rendering-translation.service';

describe('RenderingTranslationService', () => {
	let service: RenderingTranslationService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RenderingTranslationService],
		});

		service = new RenderingTranslationService();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getRenderingForQuestion', () => {
		it('should should return a textbox rendering when the answerType is FREETEXT', () => {
			const question = new Question();
			question.answerType = 'FREETEXT';
			const result = service.getRenderingForQuestion(question);
			expect(result.toString()).toBe('TEXTBOX');
		});

		it(
			'should should return a radio rendering when the answerType is SELECTONE and' +
				'amount of answerOptions are less than combobox option threshold',
			() => {
				const question = new Question();
				question.answerType = 'SELECTONE';
				question.answerOptions = [new AnswerOption(), new AnswerOption()];
				const result = service.getRenderingForQuestion(question);
				expect(result.toString()).toBe('RADIO');
			},
		);

		it(
			'should should return a checkbox rendering when the answerType is SELECTMULTI and' +
				'amount of answerOptions are less than combobox options threshold',
			() => {
				const question = new Question();
				question.answerType = 'SELECTMULTI';
				question.answerOptions = [new AnswerOption(), new AnswerOption()];
				const result = service.getRenderingForQuestion(question);
				expect(result.toString()).toBe('CHECKBOX');
			},
		);

		describe('combobox', () => {
			it(
				'should should return a combobox rendering when the answerType is SELECTONE and' +
					'amount of answerOptions are greater or equeal combobox options threshold',
				() => {
					const question = new Question();
					question.answerType = 'SELECTONE';
					for (let index = 0; index < comboboxOptionsThreshold + 2; index++) {
						question.answerOptions.push(new AnswerOption());
					}

					const result = service.getRenderingForQuestion(question);
					expect(result.toString()).toBe('COMBOBOX');
				},
			);

			it(
				'should should return a combobox rendering when the answerType is SELECTMULTI and' +
					'amount of answerOptions are greater or equeal combobox options threshold',
				() => {
					const question = new Question();
					question.answerType = 'SELECTMULTI';
					for (let index = 0; index < comboboxOptionsThreshold + 2; index++) {
						question.answerOptions.push(new AnswerOption());
					}

					const result = service.getRenderingForQuestion(question);
					expect(result.toString()).toBe('COMBOBOX');
				},
			);
		});

		it('should should throw no rendering for question, when answerType is UNKNOWNRENDERING123', () => {
			const question = new Question();
			question.externalQuestionId = 'InvalidQuestion1';
			question.answerType = 'UNKNOWNRENDERING123';

			expect(() => service.getRenderingForQuestion(question)).toThrowError();
		});
	});
});
