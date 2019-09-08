import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';

import { featureFlags } from '../feature-flags';
import { FeatureToggleService } from '../services/feature-toggle.service';

@Directive({
	selector: '[appFeatureToggle]',
})
export class FeatureToggleDirective implements OnInit {
	@Input('appFeatureToggle') public featureFlag: featureFlags | featureFlags[];

	constructor(
		private vcr: ViewContainerRef,
		private tpl: TemplateRef<any>,
		private featureToggleService: FeatureToggleService,
	) {}

	public ngOnInit() {
		if (this.featureToggleService.hasFlags(this.featureFlag)) {
			this.vcr.createEmbeddedView(this.tpl);
		}
	}
}
