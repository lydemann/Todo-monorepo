import { mount } from 'cypress/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { appRoutes } from 'apps/todo-app/src/app/app.routes';
import { AppModule } from './app.module';
import * as config from '../assets/app-config.json';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListResourcesService } from 'libs/todo-app/domain/src/lib/todo-list/resources/todo-list-resources.service';
import { of } from 'rxjs';
import { contains } from 'cypress/types/jquery';
import { TranslateService } from '@ngx-translate/core';

describe('TodoListComponent', () => {
	@Component({
		selector: 'app-wrapper-component',
		template: '<router-outlet></router-outlet>',
	})
	class WrapperComponent {
		constructor() {
			(window as any).config = config;
		}
	}

	const setup = (initTodoItems: TodoItem[] = []) => {
		return mount(WrapperComponent, {
			imports: [
				RouterTestingModule.withRoutes([...appRoutes]),
				HttpClientModule,
				AppModule,
				// CoreModule,
			],
		}).then(
			async ({
				fixture: {
					debugElement: { injector },
				},
			}) => {
				const ngZone = injector.get(NgZone);
				const router = injector.get(Router);
				const todoListResourceService = injector.get(TodoListResourcesService);
				const translateService = injector.get(TranslateService);

				// or mock service worker
				todoListResourceService.getTodos = () => {
					return of(initTodoItems);
				};

				await ngZone.run(() => router.navigate(['']));

				return {
					ngZone,
					router,
					injector,
				};
			},
		);
	};

	// it('should create todo item', () => {
	// 	setup().then(({}) => {
	// 		const title = 'Some title';
	// 		cy.get('[data-test=todo-title]').type(title);
	// 		const description = 'Some description';
	// 		cy.get('[data-test=todo-description]').type(description);
	// 		const dueDate = new Date().toLocaleDateString('en-US');
	// 		cy.get('[data-test=todo-duedate]').type(dueDate);
	// 		cy.get('[data-test=create-todo-submit]').click();

	// 		cy.get('[data-test=todo-item]').shadow().contains(title);
	// 		cy.get('[data-test=todo-item]').shadow().contains(description);
	// 	});
	// });

	it('should delete todo item', () => {
		const title = 'Item to delete';
		const description = 'This item should be deleted';
		setup([
			{
				title,
				description,
			} as TodoItem,
		]).then(({}) => {
			cy.get('[data-test=todo-item]').shadow().contains(title);
			cy.get('[data-test=todo-item]').shadow().contains(description);

			cy.get('[data-test=todo-item]')
				.shadow()
				.get('[data-test="delete-button"]')
				.click();

			cy.get('[data-test=todo-item]').should('not.exist');
		});
	});
});
