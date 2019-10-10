import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'assets/app-config.json', true);
xhttp.onreadystatechange = function() {
	if (this.readyState === 4 && this.status === 200) {
		const config = JSON.parse(this.responseText);
		window.config = config;

		if (environment.production) {
			enableProdMode();
		}

		platformBrowserDynamic()
			.bootstrapModule(AppModule)
			// tslint:disable-next-line: no-console
			.catch(err => console.error(err));
	}
};
xhttp.send();
