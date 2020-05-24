import React, { useEffect } from 'react';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { AddTodoReactiveFormsComponent } from '@todo/shared/ui';
import { AngularElementsEvent } from '../../models/angular-elements-output';

export const TodoForm = ({ todoItem, saveTodo }) => {
	const onSaveTodo = (event: AngularElementsEvent<TodoItem>) =>
		saveTodo(event.detail);

	useEffect(() => {
		const addTodoFormElm = document.querySelector<
			Element & AddTodoReactiveFormsComponent
		>('app-todo-form');
		addTodoFormElm.currentTodo = todoItem;
		addTodoFormElm.addEventListener('saveTodo', onSaveTodo);

		return () => {
			addTodoFormElm.removeEventListener('saveTodo', onSaveTodo);
		};
	}, [todoItem]);

	return (
		<React.Fragment>
			<app-todo-form
				headline-text='Add todo'
				due-date-text='Due date'
				create-text='Create'
				save-text='Save'
			></app-todo-form>
		</React.Fragment>
	);
};

export default TodoForm;
