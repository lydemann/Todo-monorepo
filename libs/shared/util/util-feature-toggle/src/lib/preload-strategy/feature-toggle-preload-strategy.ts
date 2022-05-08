import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FeatureToggleService } from '../services/feature-toggle.service';

@Injectable({ providedIn: 'root' })
export class FeatureTogglePreloadingStrategy implements PreloadingStrategy {
	constructor(private featureToggleService: FeatureToggleService) {}

	public preload(route: Route, load: () => Observable<any>): Observable<any> {
		return !route.data ||
			!route.data['flags'] ||
			this.featureToggleService.hasFlags(route.data['flags'])
			? load()
			: of(false);
	}
}
