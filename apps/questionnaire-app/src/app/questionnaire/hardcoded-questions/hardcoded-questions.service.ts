import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HardcodedQuestionService {
	public hardcodedQuestionsMap = new Map<string, TemplateRef<any>>();
}
