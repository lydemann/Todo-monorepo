import React from 'react';

import './app.scss';
import TodoList from './todo-list/todo-list';
// import TodoList from './todo-list/todo-list';

export const App = () => {
	return (
		<div className="app">
			<header className="flex">
				<img
					alt=""
					width="75"
					src="https://nx.dev/assets/images/nx-logo-white.svg"
				/>
				<h1>Welcome to reactapp!</h1>
			</header>
			<main>
				<app-spinner></app-spinner>
				<TodoList />
			</main>
		</div>
	);
};

export default App;
