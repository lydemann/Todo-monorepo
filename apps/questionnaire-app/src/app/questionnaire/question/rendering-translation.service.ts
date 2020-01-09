import { Injectable } from '@angular/core';

import { Question } from '../../questionnaire.model';
import { Rendering } from './renderings/rendering';
export const comboboxOptionsThreshold = 7;

class RenderingTranslationRule {
	public static freetextRenderingRule = new RenderingTranslationRule(
		Rendering.textbox,
		(question: Question) => {
			if (question.answerType.toUpperCase() === 'FREETEXT') {
				return true;
			}
			return false;
		},
	);

	public static radioRenderingRule = new RenderingTranslationRule(
		Rendering.radio,
		(question: Question) => {
			if (
				question.answerType.toUpperCase() === 'SELECTONE' &&
				question.answerOptions.length < comboboxOptionsThreshold
			) {
				return true;
			}

			return false;
		},
	);

	public static checkboxRenderingRule = new RenderingTranslationRule(
		Rendering.checkbox,
		(question: Question) => {
			if (
				question.answerType.toUpperCase() === 'SELECTMULTI' &&
				question.answerOptions.length < comboboxOptionsThreshold
			) {
				return true;
			}

			return false;
		},
	);

	public static comboboxRenderingRule = new RenderingTranslationRule(
		Rendering.combobox,
		(question: Question) => {
			if (
				(question.answerType.toUpperCase() === 'SELECTONE' ||
					question.answerType.toUpperCase() === 'SELECTMULTI') &&
				question.answerOptions.length >= comboboxOptionsThreshold
			) {
				return true;
			}

			return false;
		},
	);

	public static hardcodedRenderingRule = new RenderingTranslationRule(
		Rendering.hardcoded,
		(question: Question) => {
			if (
				question.answerType.toUpperCase() === Rendering.hardcoded.toString()
			) {
				return true;
			}

			return false;
		},
	);
	public static numberRenderingRule = new RenderingTranslationRule(
		Rendering.number,
		(question: Question) => {
			if (question.answerType.toUpperCase() === 'NUMBER') {
				return true;
			}
			return false;
		},
	);

	private constructor(
		public rendering: Rendering,
		public booleanExp: (Question) => boolean,
	) {}
}

@Injectable()
export class RenderingTranslationService {
	// Rendering rules goes here...
	private renderingTranslationRules: RenderingTranslationRule[] = [
		RenderingTranslationRule.freetextRenderingRule,
		RenderingTranslationRule.numberRenderingRule,
		RenderingTranslationRule.radioRenderingRule,
		RenderingTranslationRule.checkboxRenderingRule,
		RenderingTranslationRule.comboboxRenderingRule,
		RenderingTranslationRule.hardcodedRenderingRule,
	];

	public getRenderingForQuestion(question: Question): Rendering {
		let renderingToReturn;
		for (const renderingTranslationRule of this.renderingTranslationRules) {
			if (renderingTranslationRule.booleanExp(question)) {
				renderingToReturn = renderingTranslationRule.rendering;
				break;
			}
		}

		if (!renderingToReturn) {
			throw new Error(
				'No renderings for question: ' + question.externalQuestionId,
			);
		}

		return renderingToReturn;
	}
}
