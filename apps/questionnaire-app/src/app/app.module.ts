import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionFormGeneratorService } from './questionnaire/questionnaire-section/question-form-generator.service';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, QuestionnaireModule],
	providers: [QuestionFormGeneratorService],
	bootstrap: [AppComponent],
})
export class AppModule {}
