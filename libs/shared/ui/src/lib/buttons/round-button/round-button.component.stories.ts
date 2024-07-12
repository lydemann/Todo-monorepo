import type { Meta, StoryObj } from '@storybook/angular';
import { RoundButtonComponent } from './round-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<RoundButtonComponent> = {
	component: RoundButtonComponent,
	title: 'RoundButtonComponent',
};
export default meta;
type Story = StoryObj<RoundButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/round-button works!/gi)).toBeTruthy();
	},
};
