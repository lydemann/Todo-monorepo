import {
	createServiceFactory,
	createSpyObject,
	SpectatorService,
} from '@ngneat/spectator/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { ErrorHandler } from '@angular/core';
import { runEffect } from '@todo/shared/util-test';
import { GlobalErrorHandler } from '../global-error-handler/global-error-handler.service';
import { createErrorAction, errorProps } from './error-action-creator';
import { ErrorEffects } from './error.effects';

describe('ErrorEffects', () => {
	let spectator: SpectatorService<ErrorEffects>;
	let actions: Observable<any>;
	let effects: ErrorEffects;
	const globalErrorHandler = createSpyObject(GlobalErrorHandler);

	const createEffects = createServiceFactory({
		service: ErrorEffects,
		providers: [
			provideMockActions(() => actions),
			provideMockStore({}),
			{ provide: ErrorHandler, useValue: globalErrorHandler },
		],
	});

	beforeEach(() => {
		spectator = createEffects();
		effects = spectator.inject(ErrorEffects);
	});

	describe('handleError$', () => {
		it('should handle error', () => {
			const error = {
				message: '',
			} as Error;

			const actionFactory = createErrorAction(
				'some error',
				errorProps<{ error: Error }>(),
				{
					showNotification: true,
				},
			);

			actions = cold('a', { a: actionFactory({ error }) });
			runEffect(effects.handleError$);

			const action = {
				error,
			};
			expect(globalErrorHandler.handleError).toHaveBeenCalledWith(
				action.error,
				true,
			);
		});

		it('should handle error silently', () => {
			const error = {
				message: 'error',
			} as Error;

			const actionFactory = createErrorAction(
				'some error',
				errorProps<{ error }>(),
				{
					showNotification: false,
				},
			);

			actions = cold('a', { a: actionFactory({ error }) });
			runEffect(effects.handleError$);

			expect(globalErrorHandler.handleError).toHaveBeenCalledWith(error, false);
		});
	});
});
