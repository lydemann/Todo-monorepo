import { TextareaModule } from './textarea.module';

describe('TextareaModule', () => {
	let textareaModule: TextareaModule;

	beforeEach(() => {
		textareaModule = new TextareaModule();
	});

	it('should create an instance', () => {
		expect(textareaModule).toBeTruthy();
	});
});
