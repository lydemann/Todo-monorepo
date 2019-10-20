import {
	AfterViewInit,
	Component,
	Input,
	ViewEncapsulation,
} from '@angular/core';

import { StringHelpers } from '@todo/shared/util';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	// Need to remove view encapsulation so that the custom tooltip style defined in
	// `tooltip-component.css` will not be scoped to this component's view.
	encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements AfterViewInit {
	@Input() public tooltipText: string;
	@Input() public position:
		| 'after'
		| 'before'
		| 'above'
		| 'below'
		| 'left'
		| 'right' = 'below';
	@Input() public isOneLine = false;
	public isViewInit = false;

	public get StringHelpers() {
		return StringHelpers;
	}

	public ngAfterViewInit(): void {
		this.isViewInit = true;
	}

	public getClasses(): string {
		return this.isOneLine
			? 'app-tooltip-message one-line'
			: 'app-tooltip-message';
	}
}
