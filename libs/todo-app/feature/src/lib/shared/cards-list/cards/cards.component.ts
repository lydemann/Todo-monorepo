import { Component, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
	@Input() public cardRef: TemplateRef<unknown>;
	@Input() public data: unknown[];
}
