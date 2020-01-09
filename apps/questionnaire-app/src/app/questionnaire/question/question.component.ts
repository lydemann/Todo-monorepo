import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Question } from '../../questionnaire.model';
import { HardcodedQuestionService } from '../hardcoded-questions/hardcoded-questions.service';
import { RenderingTranslationService } from './rendering-translation.service';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.css'],
	providers: [RenderingTranslationService],
})
export class QuestionComponent {
	@Input() public question = new Question();
	@Input() public form: FormGroup;

	public get formControl() {
		return this.form.get(this.question.externalQuestionId);
	}

	constructor(
		private renderingTranslationService: RenderingTranslationService,
		private hardcodedQuestionService: HardcodedQuestionService,
	) {}

	public getQuestionRendering(question: Question) {
		return this.renderingTranslationService.getRenderingForQuestion(question);
	}

	public getTemplateRefForQuestion(questionId: string) {
		const templateRef = this.hardcodedQuestionService.hardcodedQuestionsMap.get(
			questionId,
		);
		return templateRef;
	}
}
