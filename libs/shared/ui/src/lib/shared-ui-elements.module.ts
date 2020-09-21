import { Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AccordionComponent } from './accordion/accordion.component';
import { AddTodoReactiveFormsComponent } from './add-todo/add-todo-reactive-forms/add-todo-reactive-forms.component';
import { buttonElements } from './buttons/elements.config';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CrudItemComponent } from './crud-item/crud-item.component';
import { IconComponent } from './icon/icon.component';
import { SharedUiModule } from './shared-ui.module';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextareaComponent } from './textarea';
import { ToggleComponent } from './toggle/toggle.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
	imports: [BrowserAnimationsModule, SharedUiModule, TranslateModule.forRoot()],
	declarations: [],
})
export class SharedUiElementsModule {
	constructor(private injector: Injector) {}

	public ngDoBootstrap() {
		const elements: [Type<any>, string][] = [
			// UI lib components go here
			[SpinnerComponent, 'app-spinner'],
			[SpinnerOverlayWrapperComponent, 'app-spinner-overlay-wrapper'],
			[CheckboxComponent, 'app-checkbox'],
			[IconComponent, 'app-icon'],
			...buttonElements,
			[AccordionComponent, 'app-accordion'],
			[TextareaComponent, 'app-textarea'],
			[ToggleComponent, 'app-toggle'],
			[TooltipComponent, 'app-tooltip'],
			[CrudItemComponent, 'app-crud-item'],
			[AddTodoReactiveFormsComponent, 'app-todo-form'],
		];

		for (const [component, name] of elements) {
			const el = createCustomElement(component, { injector: this.injector });
			customElements.define(name, el);
		}
	}
}
