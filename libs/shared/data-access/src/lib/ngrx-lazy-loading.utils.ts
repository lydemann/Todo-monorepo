import { Observable } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';

export class CachedValue<T> {
	constructor(
		public value: T,
		public ttl: number,
		public lastLoadedTime: Date,
	) {}
}

export const createFetchCachedValueEffect = <
	ReturnType,
	ResponseActionType extends (ReturnType) => any,
	FailedActionType extends () => any
>(
	fetchFn: () => Observable<ReturnType>,
	responseActionType: ResponseActionType,
	failedAction: FailedActionType,
) => {
	return fetchFn().pipe(
		exhaustMap(val => responseActionType(responseActionType)),
		catchError(() => failedAction()),
	);
};
