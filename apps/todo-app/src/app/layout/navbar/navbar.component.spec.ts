import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
	createComponentFactory,
	mockProvider,
	Spectator,
} from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent } from '@todo-app/layout/navbar/navbar.component';
import { SharedModule } from '@todo-app/shared/shared.module';
import { FeatureToggleService } from '@todo/shared/util-feature-toggle';

describe('NavbarComponent', () => {
	let spectator: Spectator<NavbarComponent>;
	const createComponent = createComponentFactory({
		component: NavbarComponent,
		imports: [
			FormsModule,
			RouterModule.forRoot([]),
			TranslateModule.forRoot(),
			SharedModule,
		],
		providers: [
			mockProvider(FeatureToggleService, {
				hasFlags: () => true,
			}),
		],
	});

	beforeEach(() => (spectator = createComponent()));

	it('should contain nav bar items', () => {
		expect(spectator.queryAll('.nav-item').length).toBe(5);
	});
});
