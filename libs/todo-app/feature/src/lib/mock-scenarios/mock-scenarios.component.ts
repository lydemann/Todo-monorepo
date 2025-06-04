import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	MatSlideToggleChange,
	MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {
	MOCK_SCENARIOS_LOCAL_STORAGE_KEY,
	mockScenariosEntries,
	MockScenario,
} from '@todo/todo-app/domain/mocks';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-mock-scenarios',
	standalone: true,
	imports: [MatCardModule, MatSlideToggleModule, CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex justify-center min-h-screen bg-gray-100">
			<mat-card class="w-full max-w-xl p-8 shadow-lg rounded-lg">
				<h2 class="text-2xl font-bold mb-6 text-center">Mock Scenarios</h2>
				@for (scenario of scenarios; track scenario) {
					<div
						class="flex items-center gap-4 justify-between py-3 border-b last:border-b-0"
					>
						<span class="capitalize text-gray-700">{{ scenario }}</span>
						<mat-slide-toggle
							color="primary"
							[checked]="enabledScenarios[scenario]"
							(change)="onToggle(scenario, $event)"
						>
						</mat-slide-toggle>
					</div>
				}
			</mat-card>
		</div>
	`,
	styles: [
		`
			/* Tailwind handles most styling. Add custom styles here if needed. */
		`,
	],
})
export class MockScenariosComponent implements OnInit {
	scenarios = mockScenariosEntries.map(([key]) => key as MockScenario);
	enabledScenarios: Record<MockScenario, boolean> = this.scenarios.reduce(
		(acc, scenario) => {
			acc[scenario] = false;
			return acc;
		},
		{} as Record<MockScenario, boolean>,
	);

	ngOnInit(): void {
		const stored = this.getStoredScenarios();
		this.enabledScenarios = { ...this.enabledScenarios, ...stored };
	}

	getStoredScenarios(): Record<MockScenario, boolean> {
		return JSON.parse(
			localStorage.getItem(MOCK_SCENARIOS_LOCAL_STORAGE_KEY) || '{}',
		);
	}

	onToggle(scenario: MockScenario, event: MatSlideToggleChange): void {
		this.enabledScenarios[scenario] = event.checked;
		localStorage.setItem(
			MOCK_SCENARIOS_LOCAL_STORAGE_KEY,
			JSON.stringify(this.enabledScenarios),
		);
	}
}
