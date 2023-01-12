import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { featureFlags } from '../feature-flags';

@Injectable()
export class FeatureToggleService {
	private enabledFeatures: string[] = [];

	constructor(private httpClient: HttpClient) {}

	public hasFlags(toCheck: featureFlags | featureFlags[]) {
		const flagsToCheck = Array.isArray(toCheck) ? toCheck : [toCheck];

		return flagsToCheck.some(flagToCheck =>
			this.enabledFeatures.some(
				enabledFeatureFlag => flagToCheck === enabledFeatureFlag,
			),
		);
	}

	public getFeatureFlags(userId?: string) {
		return this.httpClient
			.get('/assets/feature-flags.json?userId=' + userId)
			.pipe(
				first(),
				tap((features: any) => {
					if (!features) {
						throw new Error('No features!');
					}

					this.enabledFeatures = this.getEnabledFlags(features);
				}),
			);
	}

	private getEnabledFlags(features: { [key: string]: boolean }) {
		const enabledFeatures = [];
		for (const key in features) {
			if (Object.prototype.hasOwnProperty.call(features, key)) {
				const isEnabled = features[key];
				if (isEnabled) {
					enabledFeatures.push(key);
				}
			}
		}
		return enabledFeatures;
	}
}
