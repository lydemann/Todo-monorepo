import { ButtonsModule } from './buttons.module';

describe('ButtonModule', () => {
	let buttonModule: ButtonsModule;

	beforeEach(() => {
		buttonModule = new ButtonsModule();
	});

	it('should create an instance', () => {
		expect(buttonModule).toBeTruthy();
	});
});
