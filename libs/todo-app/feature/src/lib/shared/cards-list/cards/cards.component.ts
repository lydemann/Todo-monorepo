import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss'],
	standalone: true,
	imports: [CommonModule, TranslateModule],
})
export class CardsComponent {
	@Input() public cardRef: TemplateRef<unknown>;
	@Input() public data: unknown[];
}
