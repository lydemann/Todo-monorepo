import { todoHandlers } from './handlers/todo-handlers';
import { generalHandlers } from './handlers/general-handlers';
import { createScenarioHandlers } from './scenarios';

export const handlers = [
	// first handler wins in msw, so we need to put the scenario handlers first
	...createScenarioHandlers(),
	...generalHandlers,
	...todoHandlers,
];
