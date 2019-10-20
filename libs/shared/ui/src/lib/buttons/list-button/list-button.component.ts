import { Component } from '@angular/core';

import { ButtonParentComponent } from '../button-parent-component';

export enum ListButtonTypes {
	Add = 'Add',
	Delete = 'Delete',
}

@Component({
	selector: 'app-list-button',
	templateUrl: './list-button.component.html',
})
export class ListButtonComponent extends ButtonParentComponent<
	ListButtonTypes
> {}
