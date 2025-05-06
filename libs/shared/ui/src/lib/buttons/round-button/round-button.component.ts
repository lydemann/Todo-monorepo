import { Component } from '@angular/core';

import { ButtonParentComponent } from '../button-parent-component';

@Component({
	selector: 'app-round-button',
	templateUrl: './round-button.component.html',
	standalone: false,
})
export class RoundButtonComponent extends ButtonParentComponent {}
