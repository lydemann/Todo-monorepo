import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HardcodedQuestionsModule } from './hardcoded-questions/hardcoded-questions.module';
import { QuestionModule } from './question/question.module';
import { QuestionnaireSectionComponent } from './questionnaire-section/questionnaire-section.component';
import { QuestionnaireComponent } from './questionnaire.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		QuestionModule,
		HardcodedQuestionsModule,
	],
	declarations: [QuestionnaireComponent, QuestionnaireSectionComponent],
	exports: [QuestionnaireComponent],
})
export class QuestionnaireModule {}
