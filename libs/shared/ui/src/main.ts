// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SharedUiElementsModule } from './lib/shared-ui-elements.module';

// if (environment.production) {
// 	enableProdMode();
// }

platformBrowserDynamic()
	.bootstrapModule(
		SharedUiElementsModule,
		// No ZoneJS because web components should be used without
		// { ngZone: 'noop' }
	)
	// tslint:disable-next-line: no-console
	.catch(err => console.error(err));
