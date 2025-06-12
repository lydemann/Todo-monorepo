import { TodoItem } from '@todo/shared/todo-interfaces';

// eslint-disable-next-line prefer-const
export let MOCK_TODO_ITEMS = [
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

export const TodoMockDB = {
	items: MOCK_TODO_ITEMS,
};
