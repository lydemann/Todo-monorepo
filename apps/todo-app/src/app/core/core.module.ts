import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { SpinnerOverlayModule } from '@todo-app/core/spinner-overlay/spinner-overlay.module';
import { TodoListService } from '@todo-app/core/todo-list/todo-list.service';
import { TodoAppLibModule } from '@todo/todo-app-lib';
import { StateModule } from './store/store.module';

@NgModule({
  imports: [OverlayModule, SpinnerOverlayModule, StateModule, TodoAppLibModule],
  declarations: [],
  providers: [TodoListService]
})
export class CoreModule {}
