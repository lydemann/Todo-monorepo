import faker from 'faker';
import React, { useEffect, useState } from 'react';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { CrudItemComponent } from '@todo/shared/ui';
import TodoForm from '../shared/components/todo-form/todo-form';
import { AngularElementsEvent } from '../shared/models/angular-elements-output';
import './todo-list.scss';

export const TodoList = () => {
	const [todoList, setTodoList] = useState(getTodoList());
	const [currentTodo, setCurrentTodo] = useState(null);

	const saveTodo = (savedTodoItem: TodoItem) => {
		savedTodoItem.id = faker.random.uuid();
		setTimeout(() => {
			const existingTodoItemIdx = todoList.findIndex(
				todoItm => todoItm.id === savedTodoItem.id,
			);
			if (existingTodoItemIdx !== -1) {
				const updatedTodoList = todoList.map((todoItm, idx) =>
					idx === existingTodoItemIdx ? savedTodoItem : todoItm,
				);
				setTodoList(updatedTodoList);
			} else {
				setTodoList([...todoList, savedTodoItem]);
			}
		}, 2000);
	};
	const toggleTodoCompleted = (todoItemId: string) => {
		const updatedTodoList = todoList.map(todoItm =>
			todoItm.id === todoItemId
				? ({ ...todoItm, completed: !todoItm.completed } as TodoItem)
				: todoItm,
		);

		setTodoList(updatedTodoList);
	};

	const handleTodoCompleteToggle = (data: AngularElementsEvent) => {
		toggleTodoCompleted(data.detail);
	};

	useEffect(() => {
		const todoItemsElms = document.querySelectorAll<
			Element & CrudItemComponent
		>('app-crud-item');

		todoItemsElms.forEach((item, idx) => {
			item.todoItem = todoList[idx];
			item.addEventListener('todoCompleteToggled', handleTodoCompleteToggle);
		});

		return () => {
			todoItemsElms.forEach(item => {
				item.removeEventListener(
					'todoCompleteToggled',
					handleTodoCompleteToggle,
				);
			});
		};
	}, [todoList]);

	return (
		<React.Fragment>
			<div className='todo-list'>
				{todoList.map((todoItem, i) => (
					<app-crud-item
						key={i}
						is-read-only={true}
						complete-btn-text='Complete'
					></app-crud-item>
				))}
			</div>
			<TodoForm todoItem={null} saveTodo={saveTodo} />
		</React.Fragment>
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
