import React, { useEffect, useState } from 'react';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { AddTodoReactiveFormsComponent } from '@todo/shared/ui';
import { AngularElementsEvent } from '../../models/angular-elements-output';

export const TodoForm = ({ todoItem, isSavingTodo, saveTodo }) => {
	const onSaveTodo = (event: AngularElementsEvent<TodoItem>) =>
		saveTodo(event.detail);

	useEffect(() => {
		const addTodoFormElm = document.querySelector<
			Element & AddTodoReactiveFormsComponent
		>('app-todo-form');
		addTodoFormElm.currentTodo = todoItem;
		addTodoFormElm.isSavingTodo = isSavingTodo;
		addTodoFormElm.addEventListener('saveTodo', onSaveTodo);

		return () => {
			addTodoFormElm.removeEventListener('saveTodo', onSaveTodo);
		};
	}, [todoItem, isSavingTodo]);

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
