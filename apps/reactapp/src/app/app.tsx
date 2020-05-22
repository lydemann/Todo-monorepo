import React from 'react';

import './app.scss';
import TodoList from './todo-list/todo-list';
// import TodoList from './todo-list/todo-list';

export const App = () => {
	return (
		<div className='app'>
			<header className='flex'>
				<h1>Welcome to React Todo App</h1>
			</header>
			<main>
				<TodoList />
			</main>
		</div>
	);
};

export default App;
