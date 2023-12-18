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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ResponseActionType extends (ReturnType) => any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	FailedActionType extends () => any,
>(
	fetchFn: () => Observable<ReturnType>,
	responseActionType: ResponseActionType,
	failedAction: FailedActionType,
) => {
	return fetchFn().pipe(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		exhaustMap(val => responseActionType(responseActionType)),
		catchError(() => failedAction()),
	);
};
