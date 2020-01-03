import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@todo-app/shared/shared.module';
import { AddTodoReactiveFormsComponent } from './add-todo-reactive-forms.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, SharedModule],
	declarations: [AddTodoReactiveFormsComponent],
	exports: [AddTodoReactiveFormsComponent],
})
export class AddTodoReactiveFormsModule {}
