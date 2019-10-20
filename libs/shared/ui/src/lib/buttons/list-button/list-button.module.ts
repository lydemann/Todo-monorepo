import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../../icon/icon.module';
import { AppMaterialModule } from '../../material/material.module';
import { RoundButtonModule } from '../round-button/round-button.module';
import { AddButtonComponent } from './add-button/add-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ListButtonComponent } from './list-button.component';
import { SmallFabComponent } from './small-fab/small-fab.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule, RoundButtonModule, IconModule],
	declarations: [
		AddButtonComponent,
		DeleteButtonComponent,
		ListButtonComponent,
		SmallFabComponent,
	],
	exports: [ListButtonComponent],
})
export class ListButtonModule {}
