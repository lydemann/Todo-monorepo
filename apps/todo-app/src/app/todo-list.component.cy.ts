import { mount } from 'cypress/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { appRoutes } from 'apps/todo-app/src/app/app.routes';
import { AppModule } from './app.module';
import * as config from '../assets/app-config.json';

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

	const setup = () => {
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
			cy.get('[data-test=todo-duedate]').type(
				new Date().toLocaleDateString('en-US'),
			);
			cy.get('[data-test=create-todo-submit]').click();
		});
	});
});
