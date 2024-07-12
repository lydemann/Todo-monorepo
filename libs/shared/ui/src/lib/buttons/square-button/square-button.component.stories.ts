import type { Meta, StoryObj } from '@storybook/angular';
import { SquareButtonComponent } from './square-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SquareButtonComponent> = {
	component: SquareButtonComponent,
	title: 'SquareButtonComponent',
};
export default meta;
type Story = StoryObj<SquareButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/square-button works!/gi)).toBeTruthy();
	},
};
