import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HardcodedQuestionComponent } from './hardcoded-question/hardcoded-question.component';
import { HardcodedQuestionsComponent } from './hardcoded-questions.component';

@NgModule({
	imports: [CommonModule],
	declarations: [HardcodedQuestionsComponent, HardcodedQuestionComponent],
	exports: [HardcodedQuestionsComponent],
})
export class HardcodedQuestionsModule {}
