/* eslint-disable @nx/enforce-module-boundaries */
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first } from 'rxjs/operators';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { AppState } from 'libs/todo-app/domain/src/lib/app-state';
import { TodoListAnonymizer } from 'libs/todo-app/domain/src/lib/todo-list/state/todo-list.anonymizer';
import { TodoListState } from 'libs/todo-app/domain/src/lib/todo-list/state/todo-list.model';
import {
	FEATURE_STORE_ANONYMIZER,
	FeatureStoreAnonymizer,
} from './feature-store-anonymizer';
import { StoreAnonymizationService } from './store-anonymization.service';
import { Dictionary } from '@ngrx/entity';

class DummyAnonymizer extends FeatureStoreAnonymizer<AppState> {
	public getFeatureStateName() {
		return 'todo';
	}

	public anonymizeFeatureState(featureState: AppState) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		featureState.todoList = {
			...featureState.todoList,
			entities: Object.values(featureState.todoList.entities).map(todo => ({
				...todo,
				description: 'anonymized',
			})) as unknown as Dictionary<TodoItem>,
			ids: featureState.todoList.ids,
		};
	}
}

const anonymizationError = new Error('Some error');

class FailingDummyAnonymizer extends FeatureStoreAnonymizer<AppState> {
	public getFeatureStateName() {
		return 'general';
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public anonymizeFeatureState(featureState: AppState) {
		throw anonymizationError;
	}
}

describe('StoreAnonymizationService', () => {
	let service: StoreAnonymizationService;
	let store: MockStore<unknown>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StoreAnonymizationService,
				{
					provide: FEATURE_STORE_ANONYMIZER,
					useClass: TodoListAnonymizer,
					multi: true,
				},
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
		store = TestBed.get(Store) as MockStore<AppState>;
		store.setState({
			todoList: {
				entities: {
					'1': {
						id: '1',
						title: 'some todo',
						description: 'some todo description',
					} as TodoItem,
				},
				error: undefined,
				isAddingTodo: false,
				isLoading: false,
				selectedTodoItemId: undefined,
				ids: ['1'],
			} as TodoListState,
		} as AppState);
	});

	describe('getAnonymizedState', () => {
		it('should anonymize state of Store', done => {
			service.getAnonymizedState().subscribe(state => {
				expect(state.todoList.todos).toMatchInlineSnapshot(`undefined`);
				done();
			});
		});

		it('should override sub store with error if error during anonymization', done => {
			service
				.getAnonymizedState()
				.pipe(first())
				.subscribe(state => {
					expect(state.general as unknown).toMatchInlineSnapshot(`
				Object {
				  "error": [Error: Unable to find feature state at key "general" on RootState],
				  "errorMsg": "Error during anonymization",
				}
			`);
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
		picker: (from: T) => unknown,
	) {
		const pickedExpected = picker(expected);
		const pickedActual = picker(actual);
		expect(pickedExpected).not.toEqual(pickedActual);
	}
}
