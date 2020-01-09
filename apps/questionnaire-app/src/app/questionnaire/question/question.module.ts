import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '@todo/shared/ui';
import { QuestionComponent } from './question.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, InputModule],
	declarations: [QuestionComponent],
	exports: [QuestionComponent],
})
export class QuestionModule {}
