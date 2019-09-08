import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@todo-app/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [NavbarComponent],
	imports: [CommonModule, SharedModule],
	exports: [NavbarComponent],
	providers: [],
})
export class LayoutModule {}
