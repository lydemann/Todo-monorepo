import { Component, Inject } from '@angular/core';

import { ButtonChildComponent } from '../../button-child-component';
import { ListButtonComponent, ListButtonTypes } from '../list-button.component';

@Component({
	selector: 'app-delete-button',
	templateUrl: './delete-button.component.html',
	styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent extends ButtonChildComponent<
	ListButtonTypes
> {
	constructor(@Inject(ListButtonComponent) parent: ListButtonComponent) {
		super();
		this.parent = parent;
	}
}
