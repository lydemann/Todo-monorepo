import { union } from '@ngrx/store';

import {
	createErrorAction,
	errorProps,
	IS_ERROR_ACTION,
} from './error-action-creator';

describe('Error Action Creator', () => {
	let originalTimeout: number;
	const error = {
		status: 500,
		message: '',
		name: '',
	} as Error;

	beforeEach(() => {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
	});

	afterEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	describe('createErrorAction', () => {
		it('should create an action', () => {
			const fooActionCreator = createErrorAction('FOO', (foo: number) => ({
				foo,
			}));
			const fooAction = fooActionCreator(42);

			expect(fooAction).toEqual({
				type: 'FOO',
				[IS_ERROR_ACTION]: true,
				foo: 42,
				showNotification: true,
			});
		});

		it('should narrow the action', () => {
			const fooActionCreator = createErrorAction('FOO', (foo: number) => ({
				foo,
			}));
			const barActionCreator = createErrorAction('BAR', (bar: number) => ({
				bar,
			}));
			const both = union({ foo: fooActionCreator, bar: barActionCreator });
			const narrow = (action: typeof both) => {
				if (action.type === fooActionCreator.type) {
					expect(action.foo).toEqual(42);
				} else {
					throw new Error('Should not get here.');
				}
			};

			narrow(fooActionCreator(42));
		});

		it('should be serializable', () => {
			const fooActionCreator = createErrorAction('FOO', (foo: number) => ({
				foo,
				error,
			}));
			const fooAction = fooActionCreator(42);
			const text = JSON.stringify(fooAction);

			expect(JSON.parse(text)).toEqual({
				type: 'FOO',
				[IS_ERROR_ACTION]: true,
				error,
				foo: 42,
				showNotification: true,
			});
		});
	});

	describe('empty', () => {
		it('should allow empty action', () => {
			const foo = createErrorAction('FOO');
			const fooAction = foo();

			expect(fooAction).toEqual({
				type: 'FOO',
				[IS_ERROR_ACTION]: true,
				showNotification: true,
			});
		});
	});

	describe('errorProps', () => {
		it('should create an action', () => {
			const foo = createErrorAction(
				'FOO',
				errorProps<{ foo: number; error }>(),
			);
			const fooAction = foo({ foo: 42, error });

			expect(fooAction).toEqual({
				type: 'FOO',
				foo: 42,
				error,
				[IS_ERROR_ACTION]: true,
				showNotification: true,
			});
		});

		it('should create an action that is not showing error', () => {
			const errorActionCreator = createErrorAction(
				'FOO',
				errorProps<{ foo: number; error }>(),
				{
					showNotification: false,
				},
			);
			const errorAction = errorActionCreator({ foo: 42, error });

			expect(errorAction).toEqual({
				type: 'FOO',
				foo: 42,
				error,
				[IS_ERROR_ACTION]: true,
				showNotification: false,
			});
		});

		it('should narrow the action', () => {
			const foo = createErrorAction(
				'FOO',
				errorProps<{ foo: number; error }>(),
			);
			const bar = createErrorAction(
				'BAR',
				errorProps<{ bar: number; error }>(),
			);
			const both = union({ foo, bar });
			const narrow = (action: typeof both) => {
				if (action.type === foo.type) {
					expect(action.foo).toEqual(42);
				} else {
					throw new Error('Should not get here.');
				}
			};

			narrow(foo({ foo: 42, error }));
		});

		it('should be serializable', () => {
			const foo = createErrorAction(
				'FOO',
				errorProps<{ foo: number; error }>(),
			);
			const fooAction = foo({ foo: 42, error });
			const text = JSON.stringify(fooAction);

			expect(JSON.parse(text)).toEqual({
				foo: 42,
				type: 'FOO',
				error,
				[IS_ERROR_ACTION]: true,
				showNotification: true,
			});
		});
	});
});
