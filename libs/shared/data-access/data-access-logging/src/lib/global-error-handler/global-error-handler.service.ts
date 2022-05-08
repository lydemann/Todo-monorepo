import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LogService } from '../log/log.service';

export const ERROR_NOTIFICATION_DURATION = 2000;

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
	constructor(private injector: Injector, private snackBar: MatSnackBar) {
		super();
	}

	public override handleError(error, showNotification: boolean = true) {
		try {
			const logService: LogService = this.injector.get(LogService);
			if (showNotification) {
				// extract/map meaningful error message from error here
				this.snackBar.open('Something went wrong', '', {
					duration: ERROR_NOTIFICATION_DURATION,
					panelClass: 'danger',
				});
			}

			logService.logError(error);
		} catch (error) {
			super.handleError(error);
			return;
		}

		super.handleError(error);
	}
}
