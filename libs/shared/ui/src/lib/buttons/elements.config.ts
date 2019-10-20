import { Type } from '@angular/core';

import { ButtonComponent } from './button.component';
import { ListButtonComponent } from './list-button/list-button.component';
import { RoundButtonComponent } from './round-button/round-button.component';
import { SquareButtonComponent } from './square-button/square-button.component';

export const buttonElements: Array<[Type<any>, string]> = [
	[ButtonComponent, 'app-button'],
	[SquareButtonComponent, 'app-square-button'],
	[RoundButtonComponent, 'app-round-button'],
	[ListButtonComponent, 'app-list-button'],
];
