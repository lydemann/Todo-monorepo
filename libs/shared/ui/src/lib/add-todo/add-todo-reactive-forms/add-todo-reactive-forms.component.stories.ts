import type { Meta, StoryObj } from '@storybook/angular';
import { AddTodoReactiveFormsComponent } from './add-todo-reactive-forms.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AddTodoReactiveFormsComponent> = {
	component: AddTodoReactiveFormsComponent,
	title: 'AddTodoReactiveFormsComponent',
};
export default meta;
type Story = StoryObj<AddTodoReactiveFormsComponent>;

export const Primary: Story = {
	args: {
		headlineText: 'add-todo.headline',
		dueDateText: 'add-todo.due-date',
		createText: 'add-todo.create',
		saveText: 'add-todo.save',
		isSavingTodo: false,
	},
};

export const Heading: Story = {
	args: {
		headlineText: 'add-todo.headline',
		dueDateText: 'add-todo.due-date',
		createText: 'add-todo.create',
		saveText: 'add-todo.save',
		isSavingTodo: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/add-todo-reactive-forms works!/gi)).toBeTruthy();
	},
};
