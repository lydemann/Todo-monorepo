import { Component, Input, OnInit } from '@angular/core';

import { Questionnaire, QuestionSection } from '../questionnaire.model';

@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent {
	@Input() public questionnaire = new Questionnaire();

	public get questionnaireSections(): QuestionSection[] {
		return this.questionnaire.questionSections;
	}
}
