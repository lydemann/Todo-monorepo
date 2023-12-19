import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LogService } from './log.service';

@Injectable({
	providedIn: 'root',
})
export class LogHttpInterceptor implements HttpInterceptor {
	constructor(private logService: LogService) {}

	public intercept(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		oldReq: HttpRequest<any>,
		next: HttpHandler,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Observable<HttpEvent<any>> {
		const requestBeginTime = moment();
		return next.handle(oldReq).pipe(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			tap(_ => {
				this.logTime(requestBeginTime, oldReq.url, oldReq.method);
			}),
		);
	}

	private logTime(startMoment: moment.Moment, url: string, method: string) {
		const requestDuration = moment().diff(startMoment, 'milliseconds');

		this.logService.logHttpInfo(`HTTP ${method}`, requestDuration, url);
	}
}
