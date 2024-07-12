import type { Meta, StoryObj } from '@storybook/angular';
import { FabComponent } from './fab.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FabComponent> = {
	component: FabComponent,
	title: 'FabComponent',
};
export default meta;
type Story = StoryObj<FabComponent>;

export const Primary: Story = {
	args: {
		mini: false,
		icon: '',
		disabled: false,
		size: 'md',
		theme: 'primary',
	},
};

export const Heading: Story = {
	args: {
		mini: false,
		icon: '',
		disabled: false,
		size: 'md',
		theme: 'primary',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/fab works!/gi)).toBeTruthy();
	},
};
