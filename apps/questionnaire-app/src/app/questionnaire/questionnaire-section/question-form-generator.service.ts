import { Injectable } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
} from '@angular/forms';

import { AnswerOption, Question } from '../../questionnaire.model';
import { ValidationRule } from './validation-rules';

const selectOne = 'SELECTONE';
const selectMulti = 'SELECTMULTI';

@Injectable()
export class QuestionFormGeneratorService {
	public getQuestionsFormGroup(quesitons: Question[]): FormGroup {
		const group: { [key: string]: AbstractControl } = {};
		quesitons.forEach(question => {
			const validatiors = this.getValidationFunctions(question.validationRules);

			group[question.externalQuestionId] =
				question.answerType.toUpperCase() === selectMulti
					? new FormGroup(
							this.getAnswerOptionsControlsObj(question.answerOptions),
							validatiors,
					  )
					: new FormControl(question.answer || '', validatiors);
		});
		return new FormGroup(group);
	}

	private getAnswerOptionsControlsObj(answerOptions: AnswerOption[]) {
		const group: { [key: string]: AbstractControl } = {};
		answerOptions.forEach(
			answerOption => (group[answerOption.optionCode] = new FormControl()),
		);
		return group;
	}

	private getValidationFunctions(
		validationRuleStrings: string[],
	): Array<(control: AbstractControl) => ValidationErrors | null> | null {
		const validationRules = [];
		for (const validationRuleStr of validationRuleStrings) {
			const validationRule = ValidationRule.validationRulesMap.get(
				validationRuleStr.toUpperCase(),
			);
			if (validationRule !== undefined) {
				validationRules.push(validationRule.validationFn);
			}
		}

		return validationRules.length > 0 ? validationRules : null;
	}
}
