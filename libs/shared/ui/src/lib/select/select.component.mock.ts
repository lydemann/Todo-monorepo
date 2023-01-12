import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-select',
	template: '',
})
export class MockSelectComponent {
	@Input() public placeholder: string;
	@Input() public disabled = false;
	@Input() public options: [{ label: string; value: any }];
}
