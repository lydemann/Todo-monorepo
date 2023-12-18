import { InjectionToken, Injector } from '@angular/core';

export const FEATURE_STORE_ANONYMIZER = new InjectionToken<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	FeatureStoreAnonymizer<any>
>('FeatureStoreAnonymizer');

export abstract class FeatureStoreAnonymizer<
	FeatureStoreState,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	RootState = any,
> {
	public abstract getFeatureStateName(): keyof RootState;

	public abstract anonymizeFeatureState(
		featureState: FeatureStoreState,
		injector?: Injector,
	);

	public anonymize(state: FeatureStoreState, injector: Injector) {
		const featureStateName = this.getFeatureStateName();
		const featureState = state[featureStateName as string] as unknown;
		if (featureState) {
			this.anonymizeFeatureState(featureState as FeatureStoreState, injector);
		} else {
			throw new Error(
				`Unable to find feature state at key "${String(
					featureStateName,
				)}" on RootState`,
			);
		}
	}
}
