import { storiesOf } from '@storybook/angular';

import { SpinnerModule } from './spinner.module';

storiesOf('UI/Spinner', module)
	.add('Default', () => ({
		moduleMetadata: {
			imports: [SpinnerModule],
		},
		template: `
			<app-spinner>
			</app-spinner>
		`,
	}))
	.add('With message', () => ({
		moduleMetadata: {
			imports: [SpinnerModule],
		},
		template: `
    <app-spinner [message]="'Loading...'">
    </app-spinner>
		`,
	}));
