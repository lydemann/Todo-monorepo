import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

export class ValidationRule {
	public static get validationRulesMap() {
		if (!ValidationRule._validationRulesMap) {
			ValidationRule._validationRulesMap = new Map<string, ValidationRule>();
		}

		return ValidationRule._validationRulesMap;
	}

	public static required = new ValidationRule('REQUIRED', Validators.required);
	private static _validationRulesMap: Map<string, ValidationRule>;

	private constructor(
		private name: string,
		public validationFn: (control: AbstractControl) => ValidationErrors | null,
	) {
		ValidationRule.validationRulesMap.set(name, this);
	}

	public toString() {
		return this.name;
	}
}
