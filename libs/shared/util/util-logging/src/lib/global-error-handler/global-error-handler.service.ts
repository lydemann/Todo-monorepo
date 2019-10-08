import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { LogService } from '../log/log.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
	constructor(private injector: Injector) {
		super();
	}

	public handleError(error) {
		try {
			const logService: LogService = this.injector.get(LogService);

			logService.logError(error);
			throw error;
		} catch (error) {
			throw error;
		}
	}
}
