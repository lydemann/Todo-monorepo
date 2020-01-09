export class AnswerOption {
	public optionText: string;
	public optionCode: string;
}

export class MatchCriteria {
	public externalQuestionId: string;
	public evaluateOperator: string;
	public answerValue: string;
}

export class Question<T = any> {
	public externalQuestionId: string;
	public questionText: string;
	public helpText: string;
	public answerType: string;
	public answerOptions: AnswerOption[];
	public enableCriteria: MatchCriteria[];
	public validationRules: string[];
	public answer?: T;
	constructor() {
		this.answerOptions = [];
		this.enableCriteria = [];
		this.validationRules = [];
	}
}

export class QuestionSection {
	public questionSectionName: string;
	public headerText: string;
	public subHeaderText: string;
	public repeatable: boolean;
	public questions: Question[];
}

export class Questionnaire {
	public questionSections: QuestionSection[];
}

export class QuestionnaireRoot {
	public questionnaire: Questionnaire;
}
