import { Component, Inject } from '@angular/core';

import { ButtonChildComponent } from '../../button-child-component';
import {
	SquareButtonComponent,
	SquareButtonTypes,
} from '../square-button.component';

@Component({
	selector: 'app-primary-button',
	templateUrl: './primary-button.component.html',
	styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent extends ButtonChildComponent<
	SquareButtonTypes
> {
	constructor(@Inject(SquareButtonComponent) parent: SquareButtonComponent) {
		super();
		this.parent = parent;
	}
}
