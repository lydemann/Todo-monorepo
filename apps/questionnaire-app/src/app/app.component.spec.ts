import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { QuestionComponent } from './question/question.component';
import { QuestionFormGeneratorService } from './questionnaire-section/question-form-generator.service';
import { QuestionnaireSectionComponent } from './questionnaire-section/questionnaire-section.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				QuestionnaireComponent,
				QuestionnaireSectionComponent,
				QuestionComponent,
			],
			imports: [BrowserModule, ReactiveFormsModule],
			providers: [QuestionFormGeneratorService],
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
