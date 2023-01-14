import { mount } from 'cypress/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { appRoutes } from 'apps/todo-app/src/app/app.routes';
import { CoreModule } from '../core/core.module';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
	const setup = () => {
		return mount(TodoListComponent, {
			imports: [
				RouterTestingModule.withRoutes([...appRoutes]),
				HttpClientModule,
				CoreModule,
			],
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
				};
			},
		);
	};

	it('should create todo item', () => {
		setup().then(() => {
			cy.get('[data-test=todo-title]').type('Some title');
			cy.get('[data-test=todo-description]').type('Some description');
			cy.get('[data-test=create-todo-submit]').click();
		});
	});
});
