import { Injectable, Injector } from '@angular/core';
import { select, Store } from '@ngrx/store';
import produce from 'immer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
	FEATURE_STORE_ANONYMIZER,
	FeatureStoreAnonymizer,
} from './feature-store-anonymizer';

@Injectable({
	providedIn: 'root',
})
export class StoreAnonymizationService<RootState = any> {
	constructor(private store: Store<RootState>, private injector: Injector) {}

	/**
	 * Retrieves an anonymized version of the Store's state.
	 */
	public getAnonymizedState(): Observable<RootState> {
		return this.store.pipe(
			select(state => state),
			map(rootState => this.anonymize(rootState)),
		);
	}

	private anonymize(rootState: RootState): RootState {
		const anonymizers = this.injector.get<Array<FeatureStoreAnonymizer<any>>>(
			FEATURE_STORE_ANONYMIZER,
			[],
		);
		return produce(rootState, draft => {
			anonymizers.forEach(anonymizer => {
				try {
					anonymizer.anonymize(draft, this.injector);
				} catch (error) {
					// if error during anonymization, we override the feature store with an error to not leak any un-anonymized state
					draft[anonymizer.getFeatureStateName()] = {
						errorMsg: 'Error during anonymization',
						error,
					} as any;
				}
			});
		});
	}
}
