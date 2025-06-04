import { TodoItem } from '@todo/shared/todo-interfaces';
import { http, HttpResponse } from 'msw';
import { MOCK_TODO_ITEMS } from './todo-data';
import { badRequestResponseResolver } from './bad-requst-response-resolver';
import { createScenario } from './create-scenario';

export const GET_TODOLIST_REGEX = '**api/todoList';

const getTodoListHandler = http.get(GET_TODOLIST_REGEX, () => {
	return HttpResponse.json({
		result: {
			data: MOCK_TODO_ITEMS,
		},
	});
});

getTodoListHandler.info.path;

const postUpdateTodoItem = http.post('**api/updateTodoItem', async req => {
	const newTodoItem = await req.request.json();
	return HttpResponse.json({
		result: {
			data: {
				...(newTodoItem as TodoItem),
			},
		},
	});
});

const postCreateTodoItem = http.post('**api/createTodoItem', async req => {
	const newTodoItem = await req.request.json();
	console.log('newTodoItem', newTodoItem);
	return HttpResponse.json({
		result: {
			data: {
				...(newTodoItem as TodoItem),
				id: Math.random().toString(36).substring(7),
			},
		},
	});
});

const deleteTodoItem = http.delete('**api/deleteTodoItem/**', async req => {
	const { id } = req.params;
	return HttpResponse.json({
		result: {
			data: {
				id,
			},
		},
	});
});

export const todoHandlers = [
	getTodoListHandler,
	postCreateTodoItem,
	postUpdateTodoItem,
	deleteTodoItem,
];

const getTodoListBadReqest = createScenario(
	getTodoListHandler,
	badRequestResponseResolver,
);

const postCreateTodoItemBadReqest = createScenario(
	postCreateTodoItem,
	badRequestResponseResolver,
);

const postUpdateTodoItemBadReqest = createScenario(
	postUpdateTodoItem,
	badRequestResponseResolver,
);

const deleteTodoItemBadReqest = createScenario(
	deleteTodoItem,
	badRequestResponseResolver,
);

export const todoScenarioHandlers = {
	getTodoListBadReqest,
	postCreateTodoItemBadReqest,
	postUpdateTodoItemBadReqest,
	deleteTodoItemBadReqest,
};

export type TodoScenarioHandlers = keyof typeof todoScenarioHandlers;
