import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { catchError, filter, tap } from 'rxjs/operators';

import { GlobalErrorHandler } from '../global-error-handler/global-error-handler.service';
import { ErrorAction } from './error-action-creator';

@Injectable({ providedIn: 'root' })
export class ErrorEffects {
	public handleError$ = createEffect(
		() =>
			this.actions$.pipe(
				filter((action: ErrorAction) => action._isError),
				tap(action => {
					this.globalErrorHandler.handleError(
						action.error,
						action.showNotification,
					);
				}),
			),
		{ dispatch: false },
	);
	constructor(
		private actions$: Actions,
		@Inject(ErrorHandler) private globalErrorHandler: GlobalErrorHandler,
	) {}
}
