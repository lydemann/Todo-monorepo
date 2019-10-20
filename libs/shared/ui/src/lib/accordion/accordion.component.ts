import {
	ChangeDetectionStrategy,
	Component,
	Input,
	TemplateRef,
} from '@angular/core';

@Component({
	selector: 'app-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
	@Input() public boldTitle = '';
	@Input() public normalTitle = '';
	@Input() public isExpanded = false;
	@Input() public templateRef: TemplateRef<any>;
}
