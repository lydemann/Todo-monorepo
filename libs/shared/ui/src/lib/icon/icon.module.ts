import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../material/material.module';
import { IconComponent } from './icon.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule],
	declarations: [IconComponent],
	exports: [IconComponent],
})
export class IconModule {}
