import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeatureToggleDirective } from './directives/feature-toggle.directive';
import { FeatureToggleService } from './services/feature-toggle.service';

@NgModule({
	declarations: [FeatureToggleDirective],
	imports: [CommonModule],
	exports: [FeatureToggleDirective],
	providers: [FeatureToggleService],
})
export class FeatureToggleModule {}
