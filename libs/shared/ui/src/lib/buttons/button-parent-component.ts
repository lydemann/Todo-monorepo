import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	template: '',
})
export abstract class ButtonParentComponent<ButtonTypes = any> {
	@Input() public type: 'button' | 'submit' = 'button';
	@Input() public buttonType: ButtonTypes;
	@Input() public iconButton = false;
	@Input() public text = '';
	@Input() public disabled = false;
	@Input() public buttonStyle: { [key: string]: string };
	@Input() public buttonClass: { [key: string]: boolean };
	@Output() public clicked = new EventEmitter<void>();

	public onClick() {
		if (!this.disabled) {
			this.clicked.emit();
		}
	}
}
