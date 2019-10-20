import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SharedUiElementsModule } from './lib/shared-ui-elements.module';

platformBrowserDynamic()
	.bootstrapModule(SharedUiElementsModule)
	// tslint:disable-next-line: no-console
	.catch(err => console.error(err));
