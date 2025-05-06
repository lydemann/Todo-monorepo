import { Component } from '@angular/core';

import * as questionnaireMock from './questionnaire-mock.json';
import { QuestionnaireRoot } from './questionnaire.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: false,
})
export class AppComponent {
	public questionnaire = (questionnaireMock as QuestionnaireRoot)
		?.questionnaire;
}
