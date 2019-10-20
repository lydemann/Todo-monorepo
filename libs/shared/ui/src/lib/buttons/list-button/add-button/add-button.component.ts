import { Component, Inject } from '@angular/core';

import { ButtonChildComponent } from '../../button-child-component';
import { ListButtonComponent, ListButtonTypes } from '../list-button.component';

@Component({
	selector: 'app-add-button',
	templateUrl: './add-button.component.html',
	styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent extends ButtonChildComponent<ListButtonTypes> {
	constructor(@Inject(ListButtonComponent) parent: ListButtonComponent) {
		super();
		this.parent = parent;
	}
}
