import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NxModule } from '@nrwl/nx';

import { AppInitService } from '@todo-app/app-init.service';
import { AppComponent } from '@todo-app/app.component';
import { appRouterModule } from '@todo-app/app.routes';
import { CoreModule } from '@todo-app/core/core.module';
import { environment } from '@todo-app/environments/environment';
import { FooterComponent } from '@todo-app/footer/footer.component';
import { SharedModule } from '@todo-app/shared/shared.module';
import { TodoListModule } from '@todo-app/todo-list/todo-list.module';
import {
	FeatureToggleModule,
	FeatureToggleService,
} from '@todo/shared/util-feature-toggle';
import { LayoutModule } from './layout/layout.module';

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
		environment.feServerUrl + '/assets/i18n/',
		'-lang.json',
	);
}
@NgModule({
	declarations: [AppComponent, FooterComponent],
	imports: [
		BrowserModule,
		FormsModule,
		CoreModule,
		SharedModule,
		HttpClientModule,
		TodoListModule,
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
		NxModule.forRoot(),
		LayoutModule,
		FeatureToggleModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AppInitService],
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: preloadFeagureFlags,
			deps: [FeatureToggleService],
		},
		AppInitService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
