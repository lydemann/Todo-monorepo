import { Component } from '@angular/core';

import { ButtonParentComponent } from '../button-parent-component';

export enum ListButtonTypes {
	Add = 'Add',
	Delete = 'Delete',
	Round = 'Round',
}

@Component({
	selector: 'app-list-button',
	templateUrl: './list-button.component.html',
	standalone: false,
})
export class ListButtonComponent extends ButtonParentComponent<ListButtonTypes> {}
