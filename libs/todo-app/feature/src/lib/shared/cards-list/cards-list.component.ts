import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { CardsComponent } from './cards/cards.component';
import { ListComponent } from './list/list.component';

@Component({
	selector: 'app-cards-list',
	template: `
		<div class="mx-auto right mb-15">
			<button
				class="btn mr-10 theme-background"
				(click)="showCards()"
				[ngClass]="{ 'btn-info': typeToShow === 'cards' }"
			>
				{{ 'todo-list-section.show-cards' | translate }}
			</button>
			<button
				class="btn theme-background"
				(click)="showTable()"
				[ngClass]="{ 'btn-info': typeToShow === 'table' }"
			>
				{{ 'todo-list-section.show-list' | translate }}
			</button>
		</div>
		<ng-container *ngIf="typeToShow === 'table'">
			<app-list [tableRef]="tableRef()" [data]="data()"> </app-list>
		</ng-container>
		<ng-container *ngIf="typeToShow === 'cards'">
			<app-cards [cardRef]="cardRef()" [data]="data()"></app-cards>
		</ng-container>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		AppMaterialModule,
		TranslateModule,
		CardsComponent,
		ListComponent,
	],
})
export class CardsListComponent {
	data = input<unknown[]>();
	cardRef = input<TemplateRef<unknown>>();
	tableRef = input<TemplateRef<unknown>>();

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
