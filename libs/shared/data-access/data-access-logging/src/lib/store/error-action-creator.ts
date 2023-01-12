/**
 * This file contains an action creator for throwing errors
 * It is inspired from the `createAction` in NgRx https://github.com/ngrx/platform/blob/master/modules/store/src/action_creator.ts
 *  Example:
 *  ```
 *  export const getPaperSearchFailed = createErrorAction(
      PaperSearchActionTypes.GetPaperSearchFailed,
	  errorProps<{ error: ErrorDetails }>(),
	  {
		  showNotification: false,
	  }
    );
 * ```
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Action, ActionCreator, Creator } from '@ngrx/store';

export const IS_ERROR_ACTION = '_isError';

export class ErrorAction implements Action {
	public type: string;
	public [IS_ERROR_ACTION]: boolean;
	public error: HttpErrorResponse;
	public showNotification?: boolean;
}

export type ErrorPropsReturnType<T extends object> = T extends any[]
	? ArraysAreNotAllowed
	: T extends { type: any }
	? TypePropertyIsNotAllowed
	: T extends {
			[IS_ERROR_ACTION]: any;
	  }
	? IsErrorPropertyIsNotAllowed
	: { _as: 'props'; _p: T };

export function errorProps<
	P extends {
		error: Error | HttpErrorResponse;
	},
>(): ErrorPropsReturnType<P> {
	// the return type does not match TypePropertyIsNotAllowed, so double casting
	// is used.
	// tslint:disable-next-line: no-non-null-assertion
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return { _as: 'props', _p: undefined! } as unknown as ErrorPropsReturnType<P>;
}

export declare interface TypedErrorAction<T extends string>
	extends TypedAction<T> {
	readonly [IS_ERROR_ACTION]: boolean;
	readonly showNotification?: boolean;
}

export type FunctionWithParametersType<P extends unknown[], R = void> = (
	...args: P
) => R;

export type DisallowArraysAndTypeProperty<T> = T extends any[]
	? ArraysAreNotAllowed
	: T extends { type: any }
	? TypePropertyIsNotAllowed
	: T;

export function createErrorAction<T extends string>(
	type: T,
): ActionCreator<T, () => TypedErrorAction<T>>;

/*
 *  Creates an action used for raising errors
 */
export function createErrorAction<T extends string, P extends object>(
	type: T,
	config: { _as: 'props'; _p: P },
	errorConfig?: {
		showNotification?: boolean;
	},
): ActionCreator<T, (props: P) => P & TypedErrorAction<T>>;
export function createErrorAction<
	T extends string,
	P extends any[],
	R extends object,
>(
	type: T,
	creator: Creator<P, DisallowArraysAndTypeProperty<R>>,
	errorConfig?: {
		showNotification?: boolean;
	},
): FunctionWithParametersType<P, R & TypedErrorAction<T>> & TypedErrorAction<T>;

export function createErrorAction<T extends string, C extends Creator>(
	type: T,
	config?: { _as: 'props' } | C,
	errorConfig: {
		showNotification: boolean;
	} = {
		showNotification: true,
	},
): Creator {
	const showNotification =
		errorConfig.showNotification !== undefined
			? errorConfig.showNotification
			: true;

	if (typeof config === 'function') {
		return defineErrorType(type, (...args: any[]) => ({
			...config(...args),
			type,
			showNotification,
			[IS_ERROR_ACTION]: true,
		}));
	}

	const as = config ? config._as : 'empty';
	switch (as) {
		case 'empty':
			return defineErrorType(type, () => ({
				type,
				[IS_ERROR_ACTION]: true,
				showNotification,
			}));
		case 'props':
			return defineErrorType(type, (props: object) => ({
				...props,
				type,
				[IS_ERROR_ACTION]: true,
				showNotification,
			}));
		default:
			throw new Error('Unexpected config.');
	}
}

function defineErrorType(type: string, creator: Creator): Creator {
	const newCreator = Object.defineProperty(creator, IS_ERROR_ACTION, {
		value: true,
		writable: false,
	});

	return Object.defineProperty(newCreator, 'type', {
		value: type,
		writable: false,
	});
}

const arraysAreNotAllowedMsg = 'arrays are not allowed in action creators';
const typePropertyIsNotAllowedMsg =
	'type property is not allowed in error action creators';
const isErrorPropertyIsNotAllowedMsg = `${IS_ERROR_ACTION} property is not allowed in error action creators`;
type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg;
type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg;
type IsErrorPropertyIsNotAllowed = typeof isErrorPropertyIsNotAllowedMsg;
declare interface TypedAction<T extends string> extends Action {
	readonly type: T;
}
