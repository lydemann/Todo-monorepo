import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { runEffect } from '@todo/shared/util-test';
import { GlobalErrorHandler } from '../global-error-handler/global-error-handler.service';
import { createErrorAction, errorProps } from './error-action-creator';
import { ErrorEffects } from './error.effects';

describe('ErrorEffects', () => {
	let spectator: SpectatorService<ErrorEffects>;
	let actions: Observable<any>;
	let effects: ErrorEffects;
	let globalErrorHandler: GlobalErrorHandler;

	const createEffects = createServiceFactory({
		service: ErrorEffects,
		imports: [],
		mocks: [GlobalErrorHandler],
		providers: [provideMockActions(() => actions), provideMockStore({})],
	});

	beforeEach(() => {
		spectator = createEffects();
		effects = spectator.inject(ErrorEffects);
		globalErrorHandler = spectator.inject(GlobalErrorHandler);
	});

	describe('handleError$', () => {
		[
			error =>
				createErrorAction('some error', errorProps<{ error: Error }>())(error),
			error =>
				createErrorAction('some error', errorProps<{ error: Error }>(), {
					showNotification: true,
				})(error),
		].forEach(actionFactory => {
			it('should handle error', () => {
				const error = {
					message: '',
				} as Error;

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
		});

		[
			error =>
				createErrorAction('some error', errorProps<{ error: Error }>(), {
					showNotification: false,
				})(error),
			error =>
				createErrorAction('some error', errorProps<{ error: Error }>(), {
					showNotification: false,
				})(error),
		].forEach(actionFactory => {
			it('should handle error silently', () => {
				const error = {
					message: 'error',
				} as Error;

				actions = cold('a', { a: actionFactory({ error }) });
				runEffect(effects.handleError$);

				const action = {
					error,
				};
				expect(globalErrorHandler.handleError).toHaveBeenCalledWith(
					action.error,
					false,
				);
			});
		});
	});
});
