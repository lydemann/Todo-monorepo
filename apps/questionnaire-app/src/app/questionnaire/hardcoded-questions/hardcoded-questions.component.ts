import {
	AfterViewInit,
	Component,
	TemplateRef,
	ViewChild,
} from '@angular/core';

import { HardcodedQuestionService as HardcodedQuestionsService } from './hardcoded-questions.service';

@Component({
	selector: 'app-hardcoded-questions',
	templateUrl: './hardcoded-questions.component.html',
	styleUrls: ['./hardcoded-questions.component.scss'],
	standalone: false,
})
export class HardcodedQuestionsComponent implements AfterViewInit {
	@ViewChild('questionToBeHardCoded')
	public questionToBeHardCoded: TemplateRef<unknown>;

	constructor(
		private hardcodedQuestionsMapService: HardcodedQuestionsService,
	) {}

	public ngAfterViewInit(): void {
		this.hardcodedQuestionsMapService.hardcodedQuestionsMap.set(
			'questionToBeHardCoded',
			this.questionToBeHardCoded,
		);
	}
}
