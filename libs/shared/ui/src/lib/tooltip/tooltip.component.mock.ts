import {
	AfterViewInit,
	Component,
	Input,
	ViewEncapsulation,
} from '@angular/core';

import { StringHelpers } from '@todo/shared/util';

@Component({
	selector: 'app-tooltip',
	template: '',
	// Need to remove view encapsulation so that the custom tooltip style defined in
	// `tooltip-custom-class-example.css` will not be scoped to this component's view.
	encapsulation: ViewEncapsulation.None,
})
export class MockTooltipComponent implements AfterViewInit {
	@Input() public tooltipText: string;
	@Input() public position:
		| 'after'
		| 'before'
		| 'above'
		| 'below'
		| 'left'
		| 'right' = 'below';
	public isViewInit = false;

	public get StringHelpers() {
		return StringHelpers;
	}

	public ngAfterViewInit(): void {
		this.isViewInit = true;
	}
}
