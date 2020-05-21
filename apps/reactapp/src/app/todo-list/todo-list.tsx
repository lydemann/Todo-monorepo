import faker from 'faker';
import React from 'react';

import { TodoItem } from '@todo/shared/todo-interfaces';
import './todo-list.scss';

export const TodoList = () => {
	const todoList = getTodoList();

	return (
		<div className="todo-list">
			{todoList.map((todoItem, i) => (
				<app-crud-item key={i} todoList={todoItem}></app-crud-item>
			))}
		</div>
	);
};

const getTodoList = (): TodoItem[] => {
	const todoList = [];

	for (let index = 0; index < 5; index++) {
		const newTodo = {
			id: faker.random.uuid(),
			title: faker.random.words(2),
			description: faker.random.words(5),
		};

		todoList.push(newTodo);
	}
	return todoList;
};

export default TodoList;
