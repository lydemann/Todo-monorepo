import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	TemplateRef,
} from '@angular/core';

@Component({
	selector: 'app-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container
			[ngTemplateOutlet]="tableRef()"
			[ngTemplateOutletContext]="{ data: data() }"
		></ng-container>
	`,
	imports: [CommonModule],
})
export class ListComponent {
	tableRef = input<TemplateRef<unknown>>();
	data = input<unknown[]>();
}
