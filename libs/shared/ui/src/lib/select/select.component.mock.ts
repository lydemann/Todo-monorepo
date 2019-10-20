import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-select',
	template: '',
})
// tslint:disable-next-line:component-class-suffix
export class SelectComponentMock {
	@Input() public placeholder: string;
	@Input() public disabled = false;
	@Input() public options: [{ label: string; value: any }];
}
