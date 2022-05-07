import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';
import { TodoListComponent } from './todo-list.component';

@NgModule({
	imports: [FormsModule, CommonModule, SharedModule],
	declarations: [TodoListComponent, DuedateTodayCountPipe],
})
export class TodoListModule {}
