// this ensures jest types in all nested files
/// <reference types="jest" />

/* eslint-disable */

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

class MockIntersectionObserver {
	public observe = jest.fn();
	public unobserve = jest.fn();
	public disconnect = jest.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: MockIntersectionObserver,
});

Element.prototype.scrollIntoView = jest.fn();

import 'jest-preset-angular/setup-jest';
