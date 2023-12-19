// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AngularElementsEvent<T = any> extends Event {
	detail: T;
}
