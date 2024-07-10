import {
	enableProdMode,
	ErrorHandler,
	importProvidersFrom,
} from '@angular/core';
import { worker } from '@todo/todo-app/domain';
import { environment } from '@todo/todo-app/domain';

import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { API_ENDPOINTS, ApiEndpoints } from '@todo/shared/data-access';
import {
	HttpClient,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { AppInitService } from './app/app-init.service';
import {
	GlobalErrorHandler,
	LogService,
} from '@todo/shared/data-access-logging';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreModule } from '@todo/todo-app/feature';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRouterModule } from './app/app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
	FeatureToggleModule,
	FeatureToggleService,
} from '@todo/shared/util-feature-toggle';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		config: any;
	}
}

export function init_app(appLoadService: AppInitService) {
	return () => appLoadService.init();
}

export function preloadFeagureFlags(
	featureToggleService: FeatureToggleService,
) {
	return () => {
		return featureToggleService.getFeatureFlags().toPromise();
	};
}

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(
		httpClient,
		environment.todoServiceUrl + '/i18n/',
		'-lang.json',
	);
}

const apiEndpointsFactory = (): ApiEndpoints => ({
	todoService: environment.todoServiceUrl,
	loggingService: environment.loggingServiceUrl,
});

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
			bootstrapApplication(AppComponent, {
				providers: [
					importProvidersFrom(
						BrowserModule,
						BrowserAnimationsModule,
						CoreModule,
						appRouterModule,
						TranslateModule.forRoot({
							loader: {
								provide: TranslateLoader,
								useFactory: HttpLoaderFactory,
								deps: [HttpClient],
							},
						}),
						ServiceWorkerModule.register('ngsw-worker.js', {
							enabled: environment.production,
						}),
						FeatureToggleModule,
					),
					// {
					// 	provide: APP_INITIALIZER,
					// 	multi: true,
					// 	useFactory: preloadFeagureFlags,
					// 	deps: [FeatureToggleService],
					// },
					{ provide: API_ENDPOINTS, useFactory: apiEndpointsFactory },
					{ provide: ErrorHandler, useClass: GlobalErrorHandler },
					AppInitService,
					LogService,
					provideHttpClient(withInterceptorsFromDi()),
				],
			}).catch(err => console.error(err));
		});
	}
};
xhttp.send();
