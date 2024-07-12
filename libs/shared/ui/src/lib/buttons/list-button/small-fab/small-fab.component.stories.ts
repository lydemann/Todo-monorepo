import type { Meta, StoryObj } from '@storybook/angular';
import { SmallFabComponent } from './small-fab.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SmallFabComponent> = {
	component: SmallFabComponent,
	title: 'SmallFabComponent',
};
export default meta;
type Story = StoryObj<SmallFabComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/small-fab works!/gi)).toBeTruthy();
	},
};
