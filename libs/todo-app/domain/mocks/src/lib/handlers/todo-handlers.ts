import { TodoItem } from '@todo/shared/todo-interfaces';
import { http, HttpResponse } from 'msw';
import { MOCK_TODO_ITEMS } from './todo-data';

export const GET_TODOLIST_REGEX = '**api/todoList';
export const todoHandlers = [
	http.get(GET_TODOLIST_REGEX, () => {
		return HttpResponse.json({
			result: {
				data: MOCK_TODO_ITEMS,
			},
		});
	}),
	http.post('**api/createTodoItem', async req => {
		const newTodoItem = await req.request.json();
		console.log('newTodoItem', newTodoItem);
		return HttpResponse.json({
			result: {
				data: {
					...(newTodoItem as TodoItem),
					// random id
					id: Math.random().toString(36).substring(7),
				},
			},
		});
	}),
	http.post('**api/updateTodoItem', async req => {
		const newTodoItem = await req.request.json();
		return HttpResponse.json({
			result: {
				data: {
					...(newTodoItem as TodoItem),
				},
			},
		});
	}),
	http.delete('**api/deleteTodoItem/**', async req => {
		const { id } = req.params;
		return HttpResponse.json({
			result: {
				data: {
					id,
				},
			},
		});
	}),
];
