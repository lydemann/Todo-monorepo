import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	@Input() public iconButton = false;
	@Input() public text = '';
	@Input() public disabled = false;
	@Output() public clicked = new EventEmitter<void>();

	public onClick() {
		if (!this.disabled) {
			this.clicked.emit();
		}
	}
}
