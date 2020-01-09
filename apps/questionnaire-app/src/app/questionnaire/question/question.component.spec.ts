import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms/';

import { Question } from '../../questionnaire.model';
import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
	let component: QuestionComponent;
	let fixture: ComponentFixture<QuestionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [QuestionComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionComponent);
		component = fixture.componentInstance;
	});

	const freeTextQuestionMock: Question = {
		externalQuestionId: 'Question1',
		questionText: "What's your name?",
		helpText: 'Please write your name',
		answerType: 'FreeText',
		answerOptions: [],
		enableCriteria: [],
		validationRules: ['Required'],
	};

	it('should create freetext question', () => {
		component.question = freeTextQuestionMock;
		const controls = {};
		controls[component.question.externalQuestionId] = new FormControl();
		component.form = new FormGroup(controls);

		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	const selectOneQuestionMock = {
		externalQuestionId: 'Question2',
		questionText: 'Where are you from?',
		helpText: '',
		answerType: 'SelectOne',
		answerOptions: [
			{
				optionText: 'Denmark',
				optionCode: 'DK',
			},
			{
				optionText: 'Norway',
				optionCode: 'NO',
			},
			{
				optionText: 'USA',
				optionCode: 'US',
			},
		],
		enableCriteria: [],
		validationRules: ['Required'],
	};

	it('should create SelectOne question with 3 answer options', () => {
		component.question = selectOneQuestionMock;
		const controls = {};
		controls[component.question.externalQuestionId] = new FormControl();
		component.form = new FormGroup(controls);

		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	const selectMultiQuestionMock = {
		externalQuestionId: 'Question4',
		questionText: 'Where did you hear about us?',
		helpText: '',
		answerType: 'SelectMulti',
		answerOptions: [
			{
				optionText: 'Website',
				optionCode: 'WEBSITE',
			},
			{
				optionText: 'From friends',
				optionCode: 'FRIENDS',
			},
			{
				optionText: 'Other',
				optionCode: 'OTHER',
			},
		],
		enableCriteria: [],
		validationRules: ['Required'],
	};

	it('should create SelectMultu question with 3 answer options', () => {
		component.question = selectMultiQuestionMock;
		const controls = {};

		const answerOptionsFormControls = {};
		selectMultiQuestionMock.answerOptions.forEach(
			o => (answerOptionsFormControls[o.optionCode] = new FormControl()),
		);
		controls[component.question.externalQuestionId] = new FormGroup(
			answerOptionsFormControls,
		);
		component.form = new FormGroup(controls);

		fixture.detectChanges();
		expect(component).toBeTruthy();
	});
});
