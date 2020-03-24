import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-select-option',
	templateUrl: './select-option.component.html',
})
export class SelectOptionComponent {
	@ViewChild('label') public templateRef: TemplateRef<any>;
	@Input() public value: any;
}
