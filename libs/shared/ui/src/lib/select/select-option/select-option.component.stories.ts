import type { Meta, StoryObj } from '@storybook/angular';
import { SelectOptionComponent } from './select-option.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SelectOptionComponent> = {
	component: SelectOptionComponent,
	title: 'SelectOptionComponent',
};
export default meta;
type Story = StoryObj<SelectOptionComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/select-option works!/gi)).toBeTruthy();
	},
};
