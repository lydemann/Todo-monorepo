import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first } from 'rxjs/operators';

import {
	FEATURE_STORE_ANONYMIZER,
	FeatureStoreAnonymizer,
} from './feature-store-anonymizer';
import { StoreAnonymizationService } from './store-anonymization.service';

class DummyAnonymizer extends FeatureStoreAnonymizer<any> {
	public getFeatureStateName() {
		return 'todo';
	}

	public anonymizeFeatureState(featureState) {
		featureState.todos = featureState.todos.map(todo => ({}));
	}
}

const anonymizationError = new Error('Some error');

class FailingDummyAnonymizer extends FeatureStoreAnonymizer<any> {
	public getFeatureStateName() {
		return 'general';
	}

	public anonymizeFeatureState(featureState) {
		throw anonymizationError;
	}
}

describe('StoreAnonymizationService', () => {
	let service: StoreAnonymizationService;
	let store: MockStore<any>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StoreAnonymizationService,
				...provideMockStore(),
				{
					provide: FEATURE_STORE_ANONYMIZER,
					useClass: DummyAnonymizer,
					multi: true,
				},
				{
					provide: FEATURE_STORE_ANONYMIZER,
					useClass: FailingDummyAnonymizer,
					multi: true,
				},
			],
		});

		service = TestBed.get(StoreAnonymizationService);
		store = TestBed.get(Store) as MockStore<any>;
		store.setState({
			general: {},
			todoList: {
				todos: [
					{
						name: 'some todo',
					},
				],
			},
		} as any);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getAnonymizedState', () => {
		it('should anonymize state of Store', done => {
			service.getAnonymizedState().subscribe(state => {
				expect(state.todoList.todos).toEqual([]);
				done();
			});
		});

		it('should override sub store with error if error during anonymization', done => {
			service
				.getAnonymizedState()
				.pipe(first())
				.subscribe(state => {
					expect(state.general as any).toEqual({
						errorMsg: 'Error during anonymization',
						error: anonymizationError,
					} as any);
					done();
				});
		});
	});
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StoreAnonymizationTestHelpers {
	export function expectDifferent<T>(
		expected: T,
		actual: T,
		picker: (from: T) => any,
	) {
		const pickedExpected = picker(expected);
		const pickedActual = picker(actual);
		expect(pickedExpected).not.toEqual(pickedActual);
	}
}
