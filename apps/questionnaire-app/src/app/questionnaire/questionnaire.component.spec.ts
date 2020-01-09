import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HardcodedQuestionComponent } from './hardcoded-questions/hardcoded-question/hardcoded-question.component';
import { HardcodedQuestionsComponent } from './hardcoded-questions/hardcoded-questions.component';
import { QuestionComponent } from './question/question.component';
import { QuestionFormGeneratorService } from './questionnaire-section/question-form-generator.service';
import { QuestionnaireSectionComponent } from './questionnaire-section/questionnaire-section.component';
import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
	let component: QuestionnaireComponent;
	let fixture: ComponentFixture<QuestionnaireComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				QuestionnaireComponent,
				QuestionnaireSectionComponent,
				QuestionComponent,
				HardcodedQuestionsComponent,
				HardcodedQuestionComponent,
			],
			imports: [BrowserModule, ReactiveFormsModule],
			providers: [QuestionFormGeneratorService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionnaireComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
