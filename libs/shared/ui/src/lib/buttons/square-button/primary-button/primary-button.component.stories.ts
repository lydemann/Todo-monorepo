import type { Meta, StoryObj } from '@storybook/angular';
import { PrimaryButtonComponent } from './primary-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PrimaryButtonComponent> = {
	component: PrimaryButtonComponent,
	title: 'PrimaryButtonComponent',
};
export default meta;
type Story = StoryObj<PrimaryButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/primary-button works!/gi)).toBeTruthy();
	},
};
