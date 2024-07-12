import { TodoItem } from '@todo/shared/todo-interfaces';
import { http, HttpResponse } from 'msw';

export const MOCK_TODO_ITEMS = [
	{
		id: 'c6893de8-5ea7-4bd5-ab34-b935990abc9e',
		title: 'Steel Ergonomic',
		description: 'Engineer Group instruction set recontextualize Steel',
		dueDate: new Date().toLocaleDateString('en-us'),
	},
	{
		id: 'dd0b94c6-3efd-4a98-b16a-5f396cb842b9',
		title: 'programming Tasty',
		description:
			'interface Intelligent Concrete Soap Stravenue Refined Frozen Towels Heard Island and McDonald Islands',
		dueDate: new Date().toLocaleDateString('en-us'),
	},
	{
		id: '21a59b9e-a9b2-4438-b86b-d2465e717c1d',
		title: 'redefine magenta',
		description: 'Representative Avon indigo local online',
		dueDate: new Date().toLocaleDateString('en-us'),
	},
	{
		id: 'fd6fbccb-f405-40f5-b83d-3e6a6d0cb090',
		title: 'Fresh Handcrafted Steel Pants',
		description: 'enterprise North Korean Won mint green Oklahoma eco-centric',
		dueDate: new Date().toLocaleDateString('en-us'),
	},
	{
		id: '999230a7-4594-4ace-810d-39f72823f3ae',
		title: 'Fantastic Metal Pants solid state',
		description: 'Handmade Concrete Sleek Personal Loan Account sticky',
		dueDate: new Date().toLocaleDateString('en-us'),
	},
] as TodoItem[];

export const GET_TODOLIST_REGEX = '**api/todoList';
export const todoHandlers = [
	http.get(GET_TODOLIST_REGEX, () => {
		return HttpResponse.json([
			{
				result: {
					data: MOCK_TODO_ITEMS,
				},
			},
		]);
	}),
	http.post('**api/createTodoItem', async req => {
		const newTodoItem = await req.request.json();
		return HttpResponse.json([
			{
				result: {
					data: {
						...(newTodoItem[0] as TodoItem),
						// random id
						id: Math.random().toString(36).substring(7),
					},
				},
			},
		]);
	}),
	http.post('**api/updateTodoItem', async req => {
		const newTodoItem = await req.request.json();
		return HttpResponse.json([
			{
				result: {
					data: {
						...(newTodoItem[0] as TodoItem),
					},
				},
			},
		]);
	}),
	http.delete('**api/deleteTodoItem/**', async req => {
		const { id } = req.params;
		return HttpResponse.json([
			{
				result: {
					data: {
						id,
					},
				},
			},
		]);
	}),
];
