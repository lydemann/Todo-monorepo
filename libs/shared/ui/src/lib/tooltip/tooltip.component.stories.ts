import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TooltipComponent> = {
	component: TooltipComponent,
	title: 'TooltipComponent',
};
export default meta;
type Story = StoryObj<TooltipComponent>;

export const Primary: Story = {
	args: {
		tooltipText: '',
		position: 'below',
		isOneLine: false,
	},
};

export const Heading: Story = {
	args: {
		tooltipText: '',
		position: 'below',
		isOneLine: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/tooltip works!/gi)).toBeTruthy();
	},
};
