import { CommonModule } from '@angular/common';
import {
	ModuleWithProviders,
	NgModule,
	Optional,
	SkipSelf,
} from '@angular/core';

@NgModule({
	imports: [CommonModule],
	declarations: [],
})
export class StateModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule?: StateModule,
	) {
		if (parentModule) {
			throw new Error(
				'StateModule is already loaded. Import it in the AppModule only',
			);
		}
	}
	public static forRoot(): ModuleWithProviders<StateModule> {
		return {
			ngModule: StateModule,
		};
	}
}
