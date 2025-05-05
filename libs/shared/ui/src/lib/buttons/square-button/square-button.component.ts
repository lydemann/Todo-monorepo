import { Component, Input } from '@angular/core';

import { ButtonParentComponent } from '../button-parent-component';

export type SquareButtonTypes = 'Primary' | 'Secondary';

@Component({
	selector: 'app-square-button',
	templateUrl: './square-button.component.html',
	styleUrls: ['./square-button.component.scss'],
	standalone: false,
})
export class SquareButtonComponent extends ButtonParentComponent<SquareButtonTypes> {
	@Input() public override buttonType: SquareButtonTypes;

	constructor() {
		super();
	}
}
