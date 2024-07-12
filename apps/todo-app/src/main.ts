import { enableProdMode } from '@angular/core';
import { worker } from '@todo/todo-app/domain/mocks';
import { environment } from '@todo/todo-app/domain';

import { bootstrapApplication } from '@angular/platform-browser';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppComponent } from './app/app.component';
import { appConfig } from './app.config';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		config: any;
	}
}

async function enableMocking() {
	if (!environment.mock) {
		return;
	}

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start();
}

// load app config
const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'assets/app-config.json', true);
xhttp.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
		const config = JSON.parse(this.responseText);
		window.config = config;

		if (environment.production) {
			enableProdMode();
		}

		enableMocking().then(() => {
			bootstrapApplication(AppComponent, appConfig).catch(err =>
				console.error(err),
			);
		});
	}
};
xhttp.send();
