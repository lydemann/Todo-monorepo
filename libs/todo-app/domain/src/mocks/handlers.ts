/* eslint-disable @nx/enforce-module-boundaries */
import { TodoItem } from '@todo/shared/todo-interfaces';
import { http, HttpResponse } from 'msw';

import enLang from '../../../../../apps/todo-service/src/assets/i18n/en-lang.json';
import daLang from '../../../../../apps/todo-service/src/assets/i18n/da-lang.json';

export const handlers = [
	http.get('**api/todoList', () => {
		return HttpResponse.json([
			{
				result: {
					data: [
						{
							id: 'c6893de8-5ea7-4bd5-ab34-b935990abc9e',
							title: 'Steel Ergonomic',
							description:
								'Engineer Group instruction set recontextualize Steel',
						},
						{
							id: 'dd0b94c6-3efd-4a98-b16a-5f396cb842b9',
							title: 'programming Tasty',
							description:
								'interface Intelligent Concrete Soap Stravenue Refined Frozen Towels Heard Island and McDonald Islands',
						},
						{
							id: '21a59b9e-a9b2-4438-b86b-d2465e717c1d',
							title: 'redefine magenta',
							description: 'Representative Avon indigo local online',
						},
						{
							id: 'fd6fbccb-f405-40f5-b83d-3e6a6d0cb090',
							title: 'Fresh Handcrafted Steel Pants',
							description:
								'enterprise North Korean Won mint green Oklahoma eco-centric',
						},
						{
							id: '999230a7-4594-4ace-810d-39f72823f3ae',
							title: 'Fantastic Metal Pants solid state',
							description:
								'Handmade Concrete Sleek Personal Loan Account sticky',
						},
					] as TodoItem[],
				},
			},
		]);
	}),
	http.get('**/i18n/en-lang.json', () => {
		return HttpResponse.json(enLang);
	}),
	http.get('**/i18n/da-lang.json', () => {
		return HttpResponse.json(daLang);
	}),
];
