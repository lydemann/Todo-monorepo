import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-spinner-overlay',
	templateUrl: './spinner-overlay.component.html',
	styleUrls: ['./spinner-overlay.component.scss'],
	standalone: false,
})
export class SpinnerOverlayComponent {
	@Input() public message: string;
}
