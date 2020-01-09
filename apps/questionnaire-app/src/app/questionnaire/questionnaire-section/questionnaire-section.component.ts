import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Question, QuestionSection } from '../../questionnaire.model';
import { QuestionFormGeneratorService } from './question-form-generator.service';

@Component({
	selector: 'app-questionnaire-section',
	templateUrl: './questionnaire-section.component.html',
	styleUrls: ['./questionnaire-section.component.css'],
})
export class QuestionnaireSectionComponent implements OnInit {
	public get sectionQuestions(): Question[] {
		return this.section.questions;
	}
	@Input() public section: QuestionSection = new QuestionSection();

	public questionsForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private questionControlService: QuestionFormGeneratorService,
	) {}

	public saveForm() {
		// tslint:disable-next-line: no-console
		console.log(this.questionsForm);
	}

	public ngOnInit() {
		this.questionsForm = this.questionControlService.getQuestionsFormGroup(
			this.sectionQuestions,
		);
	}
}
