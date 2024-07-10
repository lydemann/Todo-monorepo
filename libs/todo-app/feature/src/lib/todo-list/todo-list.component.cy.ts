/* eslint-disable no-empty-pattern */
/* eslint-disable @nx/enforce-module-boundaries */
import { formatDate } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import {
	TranslateLoader,
	TranslateModule,
	TranslateService,
} from '@ngx-translate/core';
import { AppModule } from '@todo-app/src/app/app.module';
import { appRoutes } from '@todo-app/src/app/app.routes';
import { TodoItem } from '@todo/shared/todo-interfaces';
import * as config from 'apps/todo-app/src/assets/app-config.json';
import * as transactions from 'apps/todo-service/src/assets/i18n/en-lang.json';
import { mount } from 'cypress/angular';
import { TodoListResourcesService } from 'libs/todo-app/domain/src/lib/todo-list/resources/todo-list-resources.service';
import { Observable, of } from 'rxjs';
import { worker } from 'libs/todo-app/domain/src/mocks/browser';

class CustomLoader implements TranslateLoader {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getTranslation(lang: string): Observable<unknown> {
		return of(transactions);
	}
}

describe('TodoListComponent', () => {
	@Component({
		selector: 'app-wrapper-component',
		template: '<router-outlet></router-outlet>',
	})
	class WrapperComponent {
		constructor(translateService: TranslateService) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).config = config;

			translateService.addLangs(['en']);
			translateService.setDefaultLang('en');
		}
	}

	const setup = (initTodoItems: TodoItem[] = []) => {
		// TOOD: fix load problem
		// worker.start({
		// 	serviceWorker: {
		// 		url: '/__cypress/src/mockServiceWorker.js',
		// 	},
		// });
		cy.wrap(
			worker.start({
				serviceWorker: { url: `/msw-service-worker.js` },
			}),
			{ log: false },
		);
		return mount(WrapperComponent, {
			imports: [
				AppModule,
				TranslateModule.forRoot({
					loader: {
						provide: TranslateLoader,
						useClass: CustomLoader,
					},
				}),
			],
			providers: [provideRouter(appRoutes)],
		}).then(
			async ({
				fixture: {
					debugElement: { injector },
				},
			}) => {
				const ngZone = injector.get(NgZone);
				const router = injector.get(Router);
				// const todoListResourceService = injector.get(TodoListResourcesService);

				// // or mock service worker
				// todoListResourceService.getTodos = () => {
				// 	return of(initTodoItems);
				// };

				await ngZone.run(() => router.navigate(['']));

				return {
					ngZone,
					router,
					injector,
				};
			},
		);
	};

	it.only('should show todo item', () => {
		const title = 'Item to show';
		const description = 'This item should be shown';
		const dueDate = new Date().toLocaleDateString('en-US');
		setup([
			{
				id: '1',
				title,
				description,
				dueDate,
			} as TodoItem,
		]).then(({}) => {
			cy.get('[data-test=todo-item]').contains(title);
			cy.get('[data-test=todo-item]').contains(description);
			const formattedDueDate = formatDate(dueDate, 'shortDate', 'en-US');
			cy.get('[data-test=todo-item]').contains(formattedDueDate);
		});
	});

	it('should create todo item', () => {
		setup().then(({}) => {
			const title = 'Some title';
			cy.get('[data-test=todo-title]').type(title);
			const description = 'Some description';
			cy.get('[data-test=todo-description]').type(description);
			const dueDate = new Date().toLocaleDateString('en-US');
			cy.get('[data-test=todo-duedate]').type(dueDate);
			cy.get('[data-test=create-todo-submit]').click();

			cy.get('[data-test=todo-item]').contains(title);
			cy.get('[data-test=todo-item]').contains(description);
			const formattedDueDate = formatDate(dueDate, 'shortDate', 'en-US');
			cy.get('[data-test=todo-item]').contains(formattedDueDate);
		});
	});

	it('should update todo item', () => {
		const title = 'Item to edited';
		const description = 'This item should be edited';
		const dueDate = new Date().toLocaleDateString('en-US');
		setup([
			{
				id: '1',
				title,
				description,
				dueDate,
			} as TodoItem,
		]).then(({}) => {
			cy.get('[data-test=todo-item]').contains(title);
			cy.get('[data-test=todo-item]').contains(description);
			const formattedDueDate = formatDate(dueDate, 'shortDate', 'en-US');
			cy.get('[data-test=todo-item]').contains(formattedDueDate);

			cy.get('[data-test=todo-item]')

				.get('[data-test="edit-button"]')
				.click();
			const updatedTitle = 'Edited title';
			cy.get('[data-test=todo-title]').clear().type(updatedTitle);
			const updatedDescription = 'Edited description';
			cy.get('[data-test=todo-description]').clear().type(updatedDescription);
			const currentDate = new Date();
			const updatedDueDate = new Date(
				currentDate.setDate(currentDate.getDate() + 1),
			).toLocaleDateString('en-US');
			cy.get('[data-test=todo-duedate]').clear().type(updatedDueDate);

			cy.get('[data-test=create-todo-submit]').click();

			cy.get('[data-test=todo-item]').contains(updatedTitle);
			cy.get('[data-test=todo-item]').contains(updatedDescription);
			const updatedFormattedDueDate = formatDate(
				updatedDueDate,
				'shortDate',
				'en-US',
			);
			cy.get('[data-test=todo-item]').contains(updatedFormattedDueDate);
		});
	});

	it('should delete todo item', () => {
		const title = 'Item to delete';
		const description = 'This item should be deleted';
		setup([
			{
				title,
				description,
			} as TodoItem,
		]).then(({}) => {
			cy.get('[data-test=todo-item]').contains(title);
			cy.get('[data-test=todo-item]').contains(description);

			cy.get('[data-test=todo-item]')
				.get('[data-test="delete-button"]')
				.click();

			cy.get('[data-test=todo-item]').should('not.exist');
		});
	});
});
