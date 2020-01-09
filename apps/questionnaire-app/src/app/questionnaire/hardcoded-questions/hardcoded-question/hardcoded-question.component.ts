import { Component, Input } from '@angular/core';

import { Question } from '../../../questionnaire.model';

@Component({
	selector: 'app-hardcoded-question',
	templateUrl: './hardcoded-question.component.html',
	styleUrls: ['./hardcoded-question.component.scss'],
})
export class HardcodedQuestionComponent {
	@Input() public question: Question;
}
