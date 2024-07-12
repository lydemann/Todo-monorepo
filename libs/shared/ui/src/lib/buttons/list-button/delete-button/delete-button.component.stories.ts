import type { Meta, StoryObj } from '@storybook/angular';
import { DeleteButtonComponent } from './delete-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DeleteButtonComponent> = {
	component: DeleteButtonComponent,
	title: 'DeleteButtonComponent',
};
export default meta;
type Story = StoryObj<DeleteButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/delete-button works!/gi)).toBeTruthy();
	},
};
