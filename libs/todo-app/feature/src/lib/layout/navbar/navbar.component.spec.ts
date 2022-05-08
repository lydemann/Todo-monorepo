import { FormsModule } from '@angular/forms';
import {
	createRoutingFactory,
	mockProvider,
	SpectatorRouting,
} from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { FeatureToggleService } from '@todo/shared/util-feature-toggle';
import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
	let spectator: SpectatorRouting<NavbarComponent>;
	const createComponent = createRoutingFactory({
		component: NavbarComponent,
		data: {},
		params: {},
		queryParams: {},
		imports: [FormsModule, TranslateModule.forRoot(), SharedModule],
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
