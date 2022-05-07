import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [NavbarComponent, FooterComponent],
	imports: [CommonModule, SharedModule],
	exports: [NavbarComponent, FooterComponent],
	providers: [],
})
export class LayoutModule {}
