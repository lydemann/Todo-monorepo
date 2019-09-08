import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListCompletedComponent } from './todo-list-completed.component';

const routes: Routes = [{ path: '', component: TodoListCompletedComponent }];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TodoListCompletedRoutingModule {}
