import faker from 'faker';
import React, { useEffect, useState } from 'react';

import { TodoItem } from '@todo/shared/todo-interfaces';
import './todo-list.scss';

export const TodoList = () => {
	const [todoList, setTodoList] = useState(getTodoList());

	const toggleTodoCompleted = (todoItemId: string) => {
		const updatedTodoList = todoList.map(todoItm =>
			todoItm.id === todoItemId
				? ({ ...todoItm, completed: !todoItm.completed } as TodoItem)
				: todoItm,
		);

		setTodoList(updatedTodoList);
	};

	const handleTodoCompleteToggle = (data: any) => {
		toggleTodoCompleted(data.detail);
	};

	useEffect(() => {
		const todoItemsElms = document.querySelectorAll('app-crud-item');

		todoItemsElms.forEach((item, idx) => {
			(item as any).todoItem = todoList[idx];
			item.addEventListener('todoCompleteToggled', handleTodoCompleteToggle);
		});

		return () => {
			todoItemsElms.forEach((item, idx) => {
				item.removeEventListener(
					'todoCompleteToggled',
					handleTodoCompleteToggle,
				);
			});
		};
	});

	return (
		<div className='todo-list'>
			{todoList.map((todoItem, i) => (
				<app-crud-item
					key={i}
					is-read-only={true}
					complete-btn-text='Complete'
				></app-crud-item>
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
