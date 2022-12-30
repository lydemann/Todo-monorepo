import { getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
/*
    This is used to run effects in tests with dispatch: false in a synchronous execution context (through the TestScheduler).
*/
export const runEffect = (effect: Observable<any>) => {
	const scheduler = getTestScheduler();
	scheduler.schedule(() => {
		// eslint-disable-next-line no-empty, no-empty-function, @typescript-eslint/no-empty-function
		effect.pipe(first()).subscribe(() => {});
	});
	scheduler.flush();
};
