import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { FeatureToggleService } from '../services/feature-toggle.service';

@Injectable({ providedIn: 'root' })
export class FeatureToggleCanActivateGuard implements CanActivate {
	constructor(private featureToggleService: FeatureToggleService) {}

	public canActivate(route: ActivatedRouteSnapshot): boolean {
		return this.featureToggleService.hasFlags(route.data['flags']);
	}
}
