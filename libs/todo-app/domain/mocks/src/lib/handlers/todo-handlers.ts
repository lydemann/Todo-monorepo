import { TodoItem } from '@todo/shared/todo-interfaces';
import { http, HttpResponse } from 'msw';
import { TodoMockDB } from './todo-data';
import { badRequestResponseResolver } from './bad-requst-response-resolver';
import { createScenario } from './create-scenario';

export const GET_TODOLIST_REGEX = '**api/todoList';

const getTodoListHandler = http.get(GET_TODOLIST_REGEX, () => {
	return HttpResponse.json({
		result: {
			data: TodoMockDB.items,
		},
	});
});

getTodoListHandler.info.path;

const postUpdateTodoItem = http.post<never, TodoItem>(
	'**api/updateTodoItem',
	async req => {
		const newTodoItem = await req.request.json();
		TodoMockDB.items = TodoMockDB.items.map(todo => {
			if (todo.id === newTodoItem.id) {
				return newTodoItem;
			}
			return todo;
		});
		return HttpResponse.json({
			result: {
				data: {
					...(newTodoItem as TodoItem),
				},
			},
		});
	},
);

const postCreateTodoItem = http.post<never, TodoItem>(
	'**api/createTodoItem',
	async req => {
		const newTodoItem = await req.request.json();
		console.log('newTodoItem', newTodoItem);
		TodoMockDB.items.push(newTodoItem as TodoItem);
		return HttpResponse.json({
			result: {
				data: {
					...(newTodoItem as TodoItem),
					id: Math.random().toString(36).substring(7),
				},
			},
		});
	},
);

const deleteTodoItem = http.post<never, string>(
	'**api/deleteTodoItem',
	async req => {
		const id = await req.request.json();
		console.log('deleteTodoItem', id);
		TodoMockDB.items = TodoMockDB.items.filter(todo => todo.id !== id);
		return HttpResponse.json({
			result: {
				data: {
					id,
				},
			},
		});
	},
);

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
