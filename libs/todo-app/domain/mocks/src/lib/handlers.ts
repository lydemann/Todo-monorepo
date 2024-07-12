import { todoHandlers } from './handlers/todo-handlers';
import { generalHandlers } from './handlers/general-handlers';

export const handlers = [...generalHandlers, ...todoHandlers];
