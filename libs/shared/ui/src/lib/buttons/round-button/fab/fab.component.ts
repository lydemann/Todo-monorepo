import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Input,
} from '@angular/core';

@Component({
	selector: 'app-fab',
	templateUrl: './fab.component.html',
	styleUrls: ['./fab.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent {
	@Input() public mini = false;
	@Input() public icon = '';
	@Input() public disabled = false;
	@Input() public size = 'md';
	@Input() public theme = 'primary';

	public get isLarge() {
		return this.size === 'lg';
	}

	public get isMedium() {
		return this.size === 'md';
	}

	public get isSmall() {
		return this.size === 'sm';
	}
}
