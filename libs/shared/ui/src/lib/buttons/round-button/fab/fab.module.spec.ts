import { FabModule } from '@app/shared/buttons/round-button/fab/fab.module';

describe('FabModule', () => {
	let fabModule: FabModule;

	beforeEach(() => {
		fabModule = new FabModule();
	});

	it('should create an instance', () => {
		expect(fabModule).toBeTruthy();
	});
});
