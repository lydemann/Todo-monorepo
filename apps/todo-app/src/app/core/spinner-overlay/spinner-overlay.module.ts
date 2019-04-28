import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerOverlayComponent } from '@todo-app/core/spinner-overlay/spinner-overlay.component';
import { SpinnerOverlayService } from '@todo-app/core/spinner-overlay/spinner-overlay.service';
import { SpinnerModule } from '@todo/shared/ui';

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [SpinnerOverlayComponent],
  entryComponents: [SpinnerOverlayComponent],
  providers: [SpinnerOverlayService],
  exports: []
})
export class SpinnerOverlayModule {}
