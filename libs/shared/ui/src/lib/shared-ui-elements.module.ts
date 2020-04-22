import { CommonModule } from '@angular/common';
import { Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AccordionComponent } from './accordion/accordion.component';
import { AccordionModule } from './accordion/accordion.module';
import { ButtonComponent } from './buttons';
import { ButtonsModule } from './buttons/buttons.module';
import { buttonElements } from './buttons/elements.config';
import { ListButtonComponent } from './buttons/list-button/list-button.component';
import { RoundButtonComponent } from './buttons/round-button/round-button.component';
import { SquareButtonComponent } from './buttons/square-button/square-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxModule } from './checkbox/checkbox.module';
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
];

@NgModule({
	imports: [BrowserModule, ...IMPORTS],
	declarations: [],
	exports: [...IMPORTS],
})
export class SharedUiElementsModule {
	constructor(private injector: Injector) {}

	public ngDoBootstrap() {
		const elements: Array<[Type<any>, string]> = [
			[SpinnerComponent, 'app-spinner'],
			[SpinnerOverlayWrapperComponent, 'app-spinner-overlay-wrapper'],
			[CheckboxComponent, 'app-checkbox'],
			[IconComponent, 'app-icon'],
			...buttonElements,
			[AccordionComponent, 'app-accordion'],
			[TextareaComponent, 'app-textarea'],
			[ToggleComponent, 'app-toggle'],
			[TooltipComponent, 'app-tooltip'],
		];

		for (const [component, name] of elements) {
			const el = createCustomElement(component, { injector: this.injector });
			customElements.define(name, el);
		}
	}
}
