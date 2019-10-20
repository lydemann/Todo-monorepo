import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SharedUiElementsModule } from '@todo/shared/ui-elements';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(SharedUiElementsModule)
	// tslint:disable-next-line: no-console
	.catch(err => console.error(err));
