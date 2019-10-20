import { Component, Inject } from '@angular/core';

import { ButtonChildComponent } from '../../button-child-component';
import {
	SquareButtonComponent,
	SquareButtonTypes,
} from '../square-button.component';

@Component({
	selector: 'app-secondary-button',
	templateUrl: './secondary-button.component.html',
	styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent extends ButtonChildComponent<
	SquareButtonTypes
> {
	constructor(@Inject(SquareButtonComponent) parent: SquareButtonComponent) {
		super();
		this.parent = parent;
	}
}
