import type { Meta, StoryObj } from '@storybook/angular';
import { AddButtonComponent } from './add-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AddButtonComponent> = {
	component: AddButtonComponent,
	title: 'AddButtonComponent',
};
export default meta;
type Story = StoryObj<AddButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/add-button works!/gi)).toBeTruthy();
	},
};
