import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion/accordion.module';
import { AddTodoReactiveFormsModule } from './add-todo/add-todo-reactive-forms/add-todo-reactive-forms.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CrudItemModule } from './crud-item/crud-item.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { IconModule } from './icon/icon.module';
import { InputModule } from './input/input.module';
import { SpinnerOverlayWrapperModule } from './spinner-overlay-wrapper/spinner-overlay-wrapper.module';
import { SpinnerModule } from './spinner/spinner.module';
import { TextareaModule } from './textarea/textarea.module';
import { ToggleModule } from './toggle/toggle.module';
import { TooltipModule } from './tooltip/tooltip.module';

const IMPORTS = [
	SpinnerModule,
	SpinnerOverlayWrapperModule,
	CheckboxModule,
	IconModule,
	ButtonsModule,
	AccordionModule,
	TextareaModule,
	ToggleModule,
	TooltipModule,
	DatePickerModule,
	InputModule,
	CrudItemModule,
	AddTodoReactiveFormsModule,
];

@NgModule({
	imports: [CommonModule, ...IMPORTS],
	exports: [...IMPORTS],
})
export class SharedUiModule {}
