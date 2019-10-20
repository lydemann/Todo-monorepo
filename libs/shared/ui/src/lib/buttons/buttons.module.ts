import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';
import { AppMaterialModule } from '../material/material.module';
import { ButtonComponent } from './button.component';
import { ListButtonModule } from './list-button/list-button.module';
import { RoundButtonModule } from './round-button/round-button.module';
import { SquareButtonModule } from './square-button/square-button.module';
@NgModule({
	imports: [
		CommonModule,
		AppMaterialModule,
		SquareButtonModule,
		RoundButtonModule,
		ListButtonModule,
		IconModule,
	],
	declarations: [ButtonComponent],
	exports: [
		ButtonComponent,
		ListButtonModule,
		RoundButtonModule,
		SquareButtonModule,
		IconModule,
	],
})
export class ButtonsModule {}
