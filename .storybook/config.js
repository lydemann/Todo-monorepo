import { addDecorator, configure, addParameters } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withA11y);
addDecorator(withNotes);

addParameters({
	options: {
		name: 'TODO app',
		addonPanelInRight: true,
	},
});

const apps = require.context('../apps', true, /.story.ts$/);
const libs = require.context('../libs', true, /.story.ts$/);
const stories = require.context('../stories', true, /.story.ts$/);

function loadStories() {
	stories.keys().forEach(filename => stories(filename));
	apps.keys().forEach(filename => apps(filename));
	libs.keys().forEach(filename => libs(filename));
}

configure(loadStories, module);
