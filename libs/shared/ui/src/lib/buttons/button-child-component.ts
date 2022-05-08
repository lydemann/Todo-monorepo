import { Component, Input } from '@angular/core';

import { ButtonParentComponent } from './button-parent-component';

@Component({
	template: '',
})
export abstract class ButtonChildComponent<ButtonTypes = any> {
	@Input() public parent: ButtonParentComponent<ButtonTypes>;

	public get iconButton() {
		return this.parent.iconButton;
	}

	public get type() {
		return this.parent.type;
	}
	public get text() {
		return this.parent.text;
	}
	public get disabled() {
		return this.parent.disabled;
	}
	public get buttonStyle(): { [key: string]: string } {
		return this.parent.buttonStyle;
	}
	public get buttonClass(): { [key: string]: boolean } {
		return this.parent.buttonClass;
	}
	public clicked() {
		this.parent.clicked.emit();
	}

	public onClick() {
		if (!this.disabled) {
			this.clicked();
		}
	}
}
