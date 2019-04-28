import { NgModule } from '@angular/core';
import { SpinnerOverlayWrapperComponent } from '@todo-app/shared/spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { SpinnerModule } from '@todo/shared/ui';

@NgModule({
  imports: [SpinnerModule],
  declarations: [SpinnerOverlayWrapperComponent],
  exports: [SpinnerOverlayWrapperComponent]
})
export class SpinnerOverlayWrapperModule {}
