/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcodedQuestionsComponent } from './hardcoded-questions.component';

describe('HardcodedQuestionComponent', () => {
	let component: HardcodedQuestionsComponent;
	let fixture: ComponentFixture<HardcodedQuestionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HardcodedQuestionsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HardcodedQuestionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
