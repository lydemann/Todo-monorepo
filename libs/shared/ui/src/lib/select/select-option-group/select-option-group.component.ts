import { Component, ContentChildren, Input, QueryList } from '@angular/core';

import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
	selector: 'app-select-option-group',
	templateUrl: './select-option-group.component.html',
})
export class SelectOptionGroupComponent {
	@ContentChildren(SelectOptionComponent) public selectOptions: QueryList<
		SelectOptionComponent
	>;

	@Input() public label: string;
}
