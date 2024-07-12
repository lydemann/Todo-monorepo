import type { Meta, StoryObj } from '@storybook/angular';
import { AddTodoComponent } from './add-todo.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TodoItem } from '@todo/shared/todo-interfaces';

const meta: Meta<AddTodoComponent> = {
	component: AddTodoComponent,
	title: 'AddTodoComponent',
};
export default meta;
type Story = StoryObj<AddTodoComponent>;

export const Primary: Story = {
	args: {
		isSavingTodo: false,
		currentTodo: new TodoItem('Some', 'Description'),
	},
};

export const Heading: Story = {
	args: {
		isSavingTodo: false,
		currentTodo: new TodoItem('Some', 'Description'),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/add-todo works!/gi)).toBeTruthy();
	},
};
