import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { TodoItem } from '@todo/shared/todo-interfaces';
import faker from 'faker';

const t = initTRPC.create();

const todoList: TodoItem[] = [];

for (let index = 0; index < 5; index++) {
	const newTodo = {
		id: faker.random.uuid() as string,
		title: faker.random.words(2) as string,
		description: faker.random.words(5) as string,
		completed: faker.datatype.boolean(),
		dueDate: faker.date.future().toISOString(),
	} as TodoItem;
	todoList.push(newTodo);
}

export const trpcRouter = t.router({
	todoList: t.procedure.query(() => {
		return todoList;
	}),
	createTodoItem: t.procedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				dueDate: z.string(),
			}),
		)
		.mutation(({ input }) => {
			console.log('createTodoItem procedure');
			const newItem = {
				id: faker.random.uuid(),
				title: input.title,
				description: input.description,
				completed: false,
				dueDate: input.dueDate,
			};
			todoList.push(newItem);
			return newItem;
		}),
	updateTodoItem: t.procedure
		.input(
			z.object({ id: z.string(), title: z.string(), description: z.string() }),
		)
		.mutation<TodoItem>(({ input }) => {
			const todoItem = todoList.find(todo => todo.id === input);
			if (!todoItem) {
				throw new Error('not found');
			}
			todoItem.title = input.title;
			todoItem.description = input.description;

			return todoItem;
		}),
	toggleCompleteTodoItem: t.procedure
		.input(z.string())
		.mutation(({ input }) => {
			const todoItem = todoList.find(todo => todo.id === input);
			if (!todoItem) {
				throw new Error('not found');
			}
			todoItem.completed = !todoItem.completed;
			return todoItem;
		}),
	deleteTodoItem: t.procedure.input(z.string()).mutation(({ input }) => {
		const todoItem = todoList.find(todo => todo.id === input);
		if (!todoItem) {
			throw new Error('not found');
		}
		todoList.splice(todoList.indexOf(todoItem), 1);
		return todoItem;
	}),
});

export type TodoTrpcRouter = typeof trpcRouter;
