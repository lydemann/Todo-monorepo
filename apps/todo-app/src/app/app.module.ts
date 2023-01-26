import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ApiEndpoints, API_ENDPOINTS } from '@todo/shared/data-access';
import {
	GlobalErrorHandler,
	LogService,
} from '@todo/shared/data-access-logging';
import {
	FeatureToggleModule,
	FeatureToggleService,
} from '@todo/shared/util-feature-toggle';
import { environment } from '@todo/todo-app/domain';
import { LayoutModule, CoreModule } from '@todo/todo-app/feature';
import { AppInitService } from './app-init.service';
import { AppComponent } from './app.component';
import { appRouterModule } from './app.routes';

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

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		HttpClientModule,
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
		LayoutModule,
		FeatureToggleModule,
	],
	providers: [
		// TODO: enable when load from assets bug is fixed for Cypress component tests with Nx
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
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
