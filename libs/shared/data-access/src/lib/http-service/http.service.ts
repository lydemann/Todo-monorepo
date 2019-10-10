import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay, take } from 'rxjs/operators';

import { LogService } from '@todo/shared/data-access-logging';

export const retryCount = 3;

interface ErrorPayload {
	title?: string;
	content: string;
	persistent?: boolean;
	pauseOnHover?: boolean;
}
// TODO: these methods has nothing to do with auth, so we can just rename them to the methods of HttpClient
@Injectable({
	providedIn: 'root',
})
export class HttpService {
	public error$: Observable<ErrorPayload>;

	private errorSubject = new Subject<ErrorPayload>();

	constructor(private http: HttpClient, private logService: LogService) {
		this.error$ = this.errorSubject.asObservable();
	}

	public authPost<T = any>(endpoint: string, body?: any): Observable<T> {
		return this.http.post(endpoint, body).pipe(
			retry(retryCount),
			take(1),
			map((res: object) => res || body),
			catchError(this.handleError<T>()),
		);
	}

	public authPut<T = any>(endpoint: string, body?: any): Observable<T> {
		return this.http.put<T>(endpoint, body).pipe(
			retry(retryCount),
			take(1),
			map((res: T) => res || body),
			catchError(this.handleError<T>()),
		);
	}

	public authPatch<T = any>(endpoint: string, body?: any): Observable<T> {
		return this.http.patch<T>(endpoint, body).pipe(
			retry(retryCount),
			take(1),
			map((res: T) => res || body),
			catchError(this.handleError<T>()),
		);
	}

	public authDelete<T = any>(endpoint: string, noop?): Observable<T> {
		return this.http.delete<T>(endpoint).pipe(
			retry(retryCount),
			take(1),
			catchError(this.handleError<T>()),
		);
	}

	public authGet<T = any>(
		endpoint: string,
		args?: { type: any },
	): Observable<T> {
		const newRequest = this.http
			.get<T>(endpoint, {
				responseType: (args && args.type) || 'json',
			})
			.pipe(
				retry(retryCount),
				catchError(this.handleError<T>()),
				shareReplay(1),
			);

		return newRequest;
	}

	private handleError<T>() {
		return (errorResponse: HttpErrorResponse): Observable<T> => {
			const { url, message, status, headers } = errorResponse;

			const error = new Error(message);
			const statusCode = Number.isInteger(status)
				? status.toString()
				: 'No status';

			const traceId =
				headers && headers.get('trace-id')
					? headers.get('trace-id')
					: 'No trace-id';

			const errorMsg = `HTTP ERROR ${statusCode}: ${error.message}`;
			this.logService.logHttpError(errorMsg, url, traceId);

			this.notifyForErrors(errorResponse);

			return throwError(message);
		};
	}

	private notifyForErrors(err: HttpErrorResponse): void {
		switch (err.status) {
			case 500:
			case 0:
				this.errorSubject.next({
					content: `We're sorry! We are having connectivity issues right now`,
					persistent: true,
				});
				break;

			default:
				this.errorSubject.next({
					title: `We apologize. Something went wrong. Please try again.`,
					content: '',
					persistent: true,
				});
		}
	}
}
