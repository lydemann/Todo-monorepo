import { OverlayModule } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LogHttpInterceptor } from '@todo/shared/data-access-logging';
import { TodoAppLibModule } from '@todo/todo-app/domain';
import { SpinnerOverlayModule } from './spinner-overlay/spinner-overlay.module';

@NgModule({
	imports: [OverlayModule, SpinnerOverlayModule, TodoAppLibModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LogHttpInterceptor,
			multi: true,
		},
	],
})
export class CoreModule {}
