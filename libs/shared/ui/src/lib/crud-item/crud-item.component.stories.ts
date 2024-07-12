import type { Meta, StoryObj } from '@storybook/angular';
import { CrudItemComponent } from './crud-item.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CrudItemComponent> = {
	component: CrudItemComponent,
	title: 'CrudItemComponent',
};
export default meta;
type Story = StoryObj<CrudItemComponent>;

export const Primary: Story = {
	args: {
		isReadOnly: false,
		dueDateText: 'add-todo.due-date',
		completeBtnText: 'todo-item.complete',
		editBtnText: 'todo-item.edit',
		deleteBtnText: 'todo-item.delete',
	},
};

export const Heading: Story = {
	args: {
		isReadOnly: false,
		dueDateText: 'add-todo.due-date',
		completeBtnText: 'todo-item.complete',
		editBtnText: 'todo-item.edit',
		deleteBtnText: 'todo-item.delete',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/crud-item works!/gi)).toBeTruthy();
	},
};
