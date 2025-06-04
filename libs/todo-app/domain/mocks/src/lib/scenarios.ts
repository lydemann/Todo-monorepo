import { HttpHandler } from 'msw';
import {
	todoScenarioHandlers,
	TodoScenarioHandlers,
} from './handlers/todo-handlers';

export const MOCK_SCENARIOS_LOCAL_STORAGE_KEY = 'MOCK_SCENARIOS_KEY';
export type MockScenario = TodoScenarioHandlers;

export type mockScenariosMap = Record<MockScenario, HttpHandler>;

const mockScenariosMap: Record<MockScenario, HttpHandler> = {
	...todoScenarioHandlers,
};
export const mockScenariosEntries = Object.entries(mockScenariosMap);

export const createScenarioHandlers = () => {
	const storedMockScenarios = JSON.parse(
		localStorage.getItem(MOCK_SCENARIOS_LOCAL_STORAGE_KEY) || '{}',
	) as Record<MockScenario, boolean>;

	const getEnabledScenarios = () =>
		mockScenariosEntries.reduce<HttpHandler[]>((acc, [scenario, handlers]) => {
			if (storedMockScenarios[scenario as MockScenario]) {
				console.log(`Using mock scenario: ${scenario}`);
				return [...acc, handlers];
			}
			return acc;
		}, []);

	return getEnabledScenarios();
};
