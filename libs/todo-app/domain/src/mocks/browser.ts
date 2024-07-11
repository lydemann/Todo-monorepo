import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const setupMocks = (handlerOverrides = []) =>
	setupWorker(...handlers, ...handlerOverrides);
