import type { Meta, StoryObj } from '@storybook/angular';
import { ListButtonComponent } from './list-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ListButtonComponent> = {
	component: ListButtonComponent,
	title: 'ListButtonComponent',
};
export default meta;
type Story = StoryObj<ListButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/list-button works!/gi)).toBeTruthy();
	},
};
