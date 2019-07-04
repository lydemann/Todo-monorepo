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
import { NavbarComponent } from '@todo-app/navbar/navbar.component';
import { SharedModule } from '@todo-app/shared/shared.module';
import { TodoListCompletedModule } from '@todo-app/todo-list-completed/todo-list-completed.module';
import { TodoListModule } from '@todo-app/todo-list/todo-list.module';

export function init_app(appLoadService: AppInitService) {
	return () => appLoadService.init();
}
export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(
		httpClient,
		environment.feServerUrl + '/assets/i18n/',
		'-lang.json',
	);
}
@NgModule({
	declarations: [AppComponent, NavbarComponent, FooterComponent],
	imports: [
		BrowserModule,
		FormsModule,
		CoreModule,
		SharedModule,
		HttpClientModule,
		appRouterModule,
		TodoListCompletedModule,
		TodoListModule,
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
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: init_app,
			deps: [AppInitService],
			multi: true,
		},
		AppInitService,
		AppInitService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
