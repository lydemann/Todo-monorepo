import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { FeatureToggleService } from '../services/feature-toggle.service';

@Injectable({ providedIn: 'root' })
export class FeatureToggleCanLoadGuard implements CanLoad {
	constructor(private featureToggleService: FeatureToggleService) {}

	public canLoad(route: Route): boolean {
		return this.featureToggleService.hasFlags(route.data['flags']);
	}
}
