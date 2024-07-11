/* eslint-disable @nx/enforce-module-boundaries */
import { http, HttpResponse } from 'msw';
import enLang from '../../../../../../apps/todo-service/src/assets/i18n/en-lang.json';
import daLang from '../../../../../../apps/todo-service/src/assets/i18n/da-lang.json';

export const generalHandlers = [
	http.get('**/i18n/en-lang.json', () => {
		return HttpResponse.json(enLang);
	}),
	http.get('**/i18n/da-lang.json', () => {
		return HttpResponse.json(daLang);
	}),
];
