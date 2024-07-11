import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreModule } from '@todo/todo-app/feature';
import { appRouterModule } from './app/app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppInitService } from './app/app-init.service';
import {
	FeatureToggleModule,
	FeatureToggleService,
} from '@todo/shared/util-feature-toggle';
import {
	HttpClient,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@todo/todo-app/domain';
import { API_ENDPOINTS, ApiEndpoints } from '@todo/shared/data-access';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
	GlobalErrorHandler,
	LogService,
} from '@todo/shared/data-access-logging';

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

export const appConfig: ApplicationConfig = {
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
};
