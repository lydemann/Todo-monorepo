/* eslint-disable no-empty-pattern */
/* eslint-disable @nx/enforce-module-boundaries */
import { formatDate } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { appConfig } from '@todo-app/src/app.config';
import { TodoItem } from '@todo/shared/todo-interfaces';
import {
	GET_TODOLIST_REGEX,
	MOCK_TODO_ITEMS,
	worker,
} from '@todo/todo-app/domain/mocks';
import * as config from 'apps/todo-app/src/assets/app-config.json';
import { mount } from 'cypress/angular';
import { http, HttpResponse } from 'msw';

describe('TodoListComponent', () => {
	@Component({
		selector: 'app-wrapper-component',
		template: '<router-outlet></router-outlet>',
		standalone: true,
		imports: [RouterModule],
	})
	class WrapperComponent {
		constructor(translateService: TranslateService) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).config = config;
			translateService.addLangs(['en']);
			translateService.setDefaultLang('en');
		}
	}
	1122;

	const setup = (
		{ todoItems }: { todoItems: TodoItem[] } = { todoItems: null },
	) => {
		return cy
			.wrap(
				worker.start({
					serviceWorker: { url: `/mockServiceWorker.js` },
				}),
			)
			.then(() => {
				if (todoItems) {
					return cy.wrap(
						worker.use(
							http.get(GET_TODOLIST_REGEX, () => {
								return HttpResponse.json([
									{
										result: {
											data: todoItems,
										},
									},
								]);
							}),
						),
					);
				}
				return null;
			})
			.then(() => {
				return mount(WrapperComponent, {
					imports: [],
					providers: [...appConfig.providers],
				}).then(
					async ({
						fixture: {
							debugElement: { injector },
						},
					}) => {
						const ngZone = injector.get(NgZone);
						const router = injector.get(Router);

						await ngZone.run(() => router.navigate(['']));

						return {
							ngZone,
							router,
							injector,
						};
					},
				);
			});
	};

	it('should show todo item', () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		setup().then(({}) => {
			cy.get('[data-testid=todo-item]').contains(todoItem.title);
			cy.get('[data-testid=todo-item]').contains(todoItem.description);
			const formattedDueDate = formatDate(
				todoItem.dueDate,
				'shortDate',
				'en-US',
			);
			cy.get('[data-testid=todo-item]').contains(formattedDueDate);
		});
	});

	it('should create todo item', () => {
		setup({ todoItems: [] }).then(({}) => {
			const title = 'Some title';
			cy.get('[data-testid=todo-title]').type(title);
			const description = 'Some description';
			cy.get('[data-testid=todo-description]').type(description);
			const dueDate = new Date().toLocaleDateString('en-US');
			cy.get('[data-testid=todo-duedate]').type(dueDate);
			cy.get('[data-testid=create-todo-submit]').click();

			cy.get('[data-testid=todo-item]').contains(title);
			cy.get('[data-testid=todo-item]').contains(description);
			const formattedDueDate = formatDate(dueDate, 'shortDate', 'en-US');
			cy.get('[data-testid=todo-item]').contains(formattedDueDate);
		});
	});

	it('should update todo item', () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		setup({ todoItems: [todoItem] }).then(({}) => {
			cy.get('[data-testid=todo-item]').contains(todoItem.title);
			cy.get('[data-testid=todo-item]').contains(todoItem.description);
			const formattedDueDate = formatDate(
				todoItem.dueDate,
				'shortDate',
				'en-US',
			);
			cy.get('[data-testid=todo-item]').contains(formattedDueDate);

			cy.get('[data-testid=todo-item]')

				.get('[data-testid="edit-button"]')
				.click();
			const updatedTitle = 'Edited title';
			cy.get('[data-testid=todo-title]').clear().type(updatedTitle);
			const updatedDescription = 'Edited description';
			cy.get('[data-testid=todo-description]').clear().type(updatedDescription);
			const currentDate = new Date();
			const updatedDueDate = new Date(
				currentDate.setDate(currentDate.getDate() + 1),
			).toLocaleDateString('en-US');
			cy.get('[data-testid=todo-duedate]').clear().type(updatedDueDate);

			cy.get('[data-testid=create-todo-submit]').click();

			cy.get('[data-testid=todo-item]').contains(updatedTitle);
			cy.get('[data-testid=todo-item]').contains(updatedDescription);
			const updatedFormattedDueDate = formatDate(
				updatedDueDate,
				'shortDate',
				'en-US',
			);
			cy.get('[data-testid=todo-item]').contains(updatedFormattedDueDate);
		});
	});

	it('should delete todo item', () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		setup({ todoItems: [todoItem] }).then(({}) => {
			cy.get('[data-testid=todo-item]').contains(todoItem.title);
			cy.get('[data-testid=todo-item]').contains(todoItem.description);

			cy.get('[data-testid=todo-item]')
				.get('[data-testid="delete-button"]')
				.click();

			cy.get('[data-testid=todo-item]').should('not.exist');
		});
	});
});
