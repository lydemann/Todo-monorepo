import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: `color-reel`,
	template: `
		<h1>Colors</h1>

		<hr />
		<div class="color-reel light-theme">
			<h2>Light theme</h2>
			<div *ngFor="let colorGroup of colors" class="color-reel__item">
				<div
					*ngFor="let color of colorGroup"
					class="color-reel__color-group"
					[ngClass]="'color-reel__color-group--' + color[0]"
				>
					<div class="color-reel__color-name">{{ color[1] }}</div>
				</div>
			</div>
		</div>

		<hr />

		<div class="color-reel dark-theme">
			<h2>Dark theme</h2>
			<div *ngFor="let colorGroup of colors" class="color-reel__item">
				<div
					*ngFor="let color of colorGroup"
					class="color-reel__color-group"
					[ngClass]="'color-reel__color-group--' + color[0]"
				>
					<div class="color-reel__color-name">{{ color[1] }}</div>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['color.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent {
	public colors = [
		[['primary', 'Primary'], ['accent', 'Accent'], ['warn', 'Warn']],
		[
			['background', 'Background'],
			['selected', 'Selected'],
			['hover', 'Hover'],
		],
		[['black', 'Black'], ['white', 'White']],
	];
}
