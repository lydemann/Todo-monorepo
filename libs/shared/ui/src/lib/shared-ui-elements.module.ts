import { CommonModule } from '@angular/common';
import { Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AccordionComponent } from './accordion';
import { AccordionModule } from './accordion/accordion.module';
import { ButtonsModule } from './buttons/buttons.module';
import { buttonElements } from './buttons/elements.config';
import { CheckboxComponent } from './checkbox';
import { CheckboxModule } from './checkbox/checkbox.module';
import { IconComponent } from './icon';
import { IconModule } from './icon/icon.module';
import { SpinnerComponent } from './spinner';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper';
import { SpinnerOverlayWrapperModule } from './spinner-overlay-wrapper/spinner-overlay-wrapper.module';
import { SpinnerModule } from './spinner/spinner.module';
import { TextareaModule } from './textarea/textarea.module';
import { ToggleComponent } from './toggle';
import { ToggleModule } from './toggle/toggle.module';
import { TooltipComponent } from './tooltip';
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
	imports: [CommonModule, ...IMPORTS],
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
			[TextareaModule, 'app-textarea'],
			[ToggleComponent, 'app-toggle'],
			[TooltipComponent, 'app-tooltip'],
		];

		for (const [component, name] of elements) {
			const el = createCustomElement(component, { injector: this.injector });
			customElements.define(name, el);
		}
	}
}
