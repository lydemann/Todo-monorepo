import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { SpinnerOverlayModule } from '@todo-app/core/spinner-overlay/spinner-overlay.module';
import { TodoAppLibModule } from '@todo/todo-app-lib';

@NgModule({
  imports: [OverlayModule, SpinnerOverlayModule, TodoAppLibModule]
})
export class CoreModule {}
