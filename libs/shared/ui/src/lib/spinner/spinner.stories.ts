import { SpinnerModule } from './spinner.module';

export default {
	title: 'UI/Spinner',
};

export const Default = () => ({
	moduleMetadata: {
		imports: [SpinnerModule],
	},
	template: `
            <app-spinner>
            </app-spinner>
        `,
});

export const WithMessage = () => ({
	moduleMetadata: {
		imports: [SpinnerModule],
	},
	template: `
    <app-spinner [message]="'Loading...'">
    </app-spinner>
        `,
});

WithMessage.story = {
	name: 'With message',
};
