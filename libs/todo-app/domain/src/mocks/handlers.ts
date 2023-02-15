/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TodoItem } from '@todo/shared/todo-interfaces';
import { rest } from 'msw';

import enLang from '../../../../../apps/todo-service/src/assets/i18n/en-lang.json';
import daLang from '../../../../../apps/todo-service/src/assets/i18n/da-lang.json';

export const handlers = [
	rest.get<TodoItem[]>('**api/todo-list', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: '1',
					title: 'Item 1',
				},
				{
					id: '2',
					title: 'Item 2',
				},
			] as TodoItem[]),
		);
	}),
	rest.get('**/i18n/en-lang.json', (req, res, ctx) => {
		return res(ctx.json(enLang));
	}),
	rest.get('**/i18n/da-lang.json', (req, res, ctx) => {
		return res(ctx.json(daLang));
	}),
];
