import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LogService } from './log.service';

@Injectable({
	providedIn: 'root',
})
export class LogHttpInterceptor implements HttpInterceptor {
	constructor(private logService: LogService) {}

	public intercept(
		oldReq: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		const requestBeginTime = moment();
		return next.handle(oldReq).pipe(
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
