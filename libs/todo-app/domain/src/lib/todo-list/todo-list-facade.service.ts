import { Injectable, computed, inject } from '@angular/core';
import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { TodoListResourcesService } from './resources/todo-list-resources.service';
import { exhaustMap, pipe, tap } from 'rxjs';

// Define TodoListState interface
interface TodoListState {
	todoList: TodoItem[];
	selectedTodoItem: TodoItem | null;
	isLoading: boolean;
	isSavingTodo: boolean;
}

const initialState: TodoListState = {
	todoList: [],
	selectedTodoItem: null,
	isLoading: false,
	isSavingTodo: false,
};

const TodoListStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed(({ todoList, selectedTodoItem, isLoading, isSavingTodo }) => ({
		completedTodos: computed(() => todoList().filter(todo => todo.completed)),
		todoList: computed(() => todoList()),
		selectedTodo: computed(() => selectedTodoItem()),
		isLoading: computed(() => isLoading()),
		isSavingTodo: computed(() => isSavingTodo()),
	})),
	withMethods(
		(store, todoListResourcesService = inject(TodoListResourcesService)) => ({
			todoCompletedToggled(todoId: string) {
				const updatedTodoList = store
					.todoList()
					.map(todo =>
						todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
					)
					.filter(todo => todo !== null);
				patchState(store, { todoList: updatedTodoList });
			},
			selectTodoForEdit(todoItem: TodoItem) {
				patchState(store, { selectedTodoItem: todoItem });
			},
			saveTodoItem(todoItem: TodoItem) {
				patchState(store, { isSavingTodo: true });
				if (todoItem.id) {
					todoListResourcesService
						.updateTodoItem(todoItem)
						.pipe(
							tapResponse(
								newTodoItem => {
									return patchState(store, {
										todoList: store
											.todoList()
											.map(todo =>
												todo.id === todoItem.id ? todoItem : todo,
											) as TodoItem[],
										isSavingTodo: false,
									});
								},
								error => {
									patchState(store, { isSavingTodo: false });
									throw error;
								},
							),
						)
						.subscribe();
				} else {
					todoListResourcesService
						.addTodoItem(todoItem)
						.pipe(
							tapResponse(
								newTodoItem => {
									return patchState(store, {
										todoList: [...store.todoList(), newTodoItem] as TodoItem[],
										isSavingTodo: false,
									});
								},
								error => {
									patchState(store, { isSavingTodo: false });
									throw error;
								},
							),
						)
						.subscribe();
				}
			},
			loadTodoList: rxMethod<void>(
				pipe(
					tap(() => patchState(store, { isLoading: true })),
					exhaustMap(() =>
						todoListResourcesService.getTodos().pipe(
							tapResponse(
								todoList => {
									patchState(store, {
										todoList: todoList as TodoItem[],
										isLoading: false,
									});
								},
								error => {
									patchState(store, { isLoading: false });
									throw error;
								},
							),
						),
					),
				),
			),
			deleteTodo(id: string) {
				// Optimistically update the state
				const originalTodoList = [...store.todoList()];
				const updatedTodoList = store.todoList().filter(todo => todo.id !== id);
				patchState(store, { todoList: updatedTodoList });

				// Call the resource service to delete the todo item
				todoListResourcesService
					.deleteTodoItem(id)
					.pipe(
						tapResponse(
							() => {
								// eslint-disable-next-line @typescript-eslint/no-empty-function
							},
							error => {
								// Revert the state if the deletion fails
								patchState(store, { todoList: originalTodoList });
								throw error;
							},
						),
					)
					.subscribe();
			},
		}),
	),
);

@Injectable({
	providedIn: 'root',
})
export class TodoListFacadeService {
	private readonly todoListStore = inject(TodoListStore);
	public readonly todoList = this.todoListStore.todoList;
	public readonly selectedTodo = this.todoListStore.selectedTodo;
	public readonly isLoading = this.todoListStore.isLoading;
	public readonly isSavingTodo = this.todoListStore.isSavingTodo;
	public readonly completedTodos = this.todoListStore.completedTodos;

	public todoCompletedToggled(todoId: string) {
		this.todoListStore.todoCompletedToggled(todoId);
	}

	public selectTodoForEdit(todoItem: TodoItem) {
		this.todoListStore.selectTodoForEdit(todoItem);
	}

	public saveTodoItem(todoItem: TodoItem) {
		this.todoListStore.saveTodoItem(todoItem);
	}

	public loadTodoList() {
		this.todoListStore.loadTodoList();
	}

	public deleteTodo(id: string) {
		this.todoListStore.deleteTodo(id);
	}
}
