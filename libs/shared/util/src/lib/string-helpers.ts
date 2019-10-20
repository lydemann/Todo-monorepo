import { trim } from 'lodash';

export class StringHelpers {
	public static isNullOrEmpty(str: string) {
		return !str || trim(str) === '';
	}
}
