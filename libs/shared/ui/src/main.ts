// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SharedUiElementsModule } from './lib/shared-ui-elements.module';

// if (environment.production) {
// 	enableProdMode();
// }

platformBrowserDynamic()
	// No ZoneJS because web components should be used without
	.bootstrapModule(SharedUiElementsModule, { ngZone: 'noop' })
	// tslint:disable-next-line: no-console
	.catch(err => console.error(err));
