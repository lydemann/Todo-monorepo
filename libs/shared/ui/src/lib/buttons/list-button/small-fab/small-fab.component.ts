import { Component, Inject, OnInit } from '@angular/core';

import { ButtonChildComponent } from '../../button-child-component';
import { ListButtonComponent, ListButtonTypes } from '../list-button.component';

@Component({
	selector: 'app-small-fab',
	templateUrl: './small-fab.component.html',
	styleUrls: ['./small-fab.component.scss'],
})
export class SmallFabComponent extends ButtonChildComponent<ListButtonTypes> {
	constructor(@Inject(ListButtonComponent) parent: ListButtonComponent) {
		super();
		this.parent = parent;
	}
}
