import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-cards-list',
	templateUrl: './cards-list.component.html',
})
export class CardsTableComponent {
	@Input() public data: any;
	@Input() public cardRef: any;
	@Input() public tableRef: any;

	private preferedShowModeKey = 'typeToShow';
	public get typeToShow(): string {
		return window.localStorage.getItem(this.preferedShowModeKey) || 'table';
	}
	public set typeToShow(showMode: string) {
		window.localStorage.setItem(this.preferedShowModeKey, showMode);
	}

	public showCards() {
		this.typeToShow = 'cards';
	}

	public showTable() {
		this.typeToShow = 'table';
	}
}
