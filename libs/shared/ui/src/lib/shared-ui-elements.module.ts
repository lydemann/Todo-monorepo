import { Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { AccordionComponent } from './accordion/accordion.component';
import { AccordionModule } from './accordion/accordion.module';
import { ButtonsModule } from './buttons/buttons.module';
import { buttonElements } from './buttons/elements.config';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CrudItemComponent } from './crud-item/crud-item.component';
import { CrudItemModule } from './crud-item/crud-item.module';
import { IconComponent } from './icon/icon.component';
import { IconModule } from './icon/icon.module';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper/spinner-overlay-wrapper.component';
import { SpinnerOverlayWrapperModule } from './spinner-overlay-wrapper/spinner-overlay-wrapper.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerModule } from './spinner/spinner.module';
import { TextareaComponent } from './textarea';
import { TextareaModule } from './textarea/textarea.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleModule } from './toggle/toggle.module';
import { TooltipComponent } from './tooltip/tooltip.component';
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
	CrudItemModule,
];

@NgModule({
	imports: [BrowserModule, ...IMPORTS, TranslateModule.forRoot()],
	declarations: [],
	exports: [...IMPORTS],
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
		];

		for (const [component, name] of elements) {
			const el = createCustomElement(component, { injector: this.injector });
			customElements.define(name, el);
		}
	}
}
